"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Animated "motherboard" background: PCB-style traces, pads and lots of
 * multi-color pulsing LEDs. Data signals travel in clean right-angle segments
 * (up/down/left/right) toward the cursor — like traces on a board — then orbit
 * the cursor for ~10s and fade out. Each click spawns a burst of 10 signals
 * from the page edges (spam-friendly, capped for performance).
 *
 * Performance-minded: DPR pinned to 1, ~30fps throttle, static trace layer
 * pre-rendered to an offscreen canvas, pre-baked additive glow sprites, fewer
 * elements on small screens, pauses when unfocused.
 */
export default function TechBackground() {
  const canvasRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDark = resolvedTheme !== "light";

    const TRACE = isDark ? "rgba(139,92,246,0.16)" : "rgba(99,102,241,0.13)";
    const PAD = isDark ? "rgba(167,139,250,0.5)" : "rgba(99,102,241,0.4)";
    const ACCENT = isDark ? "139,92,246" : "99,102,241";
    const LED_COLORS = ["#8B5CF6", "#6366F1", "#8B5CF6", "#22D3EE", "#34D399", "#F472B6", "#FBBF24"];
    const SIGNAL_COLORS = ["#A78BFA", "#22D3EE", "#818CF8", "#34D399", "#F472B6"];
    const glowAlpha = isDark ? 1 : 0.72;

    const ORBIT_ENTER = 26;
    const ORBIT_DUR = 1;
    const FADE_DUR = 0.6;

    let width = 0;
    let height = 0;
    let small = false;
    let wires = [];
    let leds = [];
    let signals = [];
    let staticCanvas = null;
    let raf = 0;
    let last = 0;
    let CAP = 300;
    let baseCount = 28;
    const t0 = performance.now();
    const FRAME_MS = 1000 / 30;

    const mouse = { x: -9999, y: -9999, on: false };
    const targetXY = () =>
      mouse.on ? { x: mouse.x, y: mouse.y } : { x: width * 0.5, y: height * 0.45 };

    const glowCache = new Map();
    function glow(color, size) {
      const key = color + size;
      if (glowCache.has(key)) return glowCache.get(key);
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const g = c.getContext("2d");
      const r = size / 2;
      const grad = g.createRadialGradient(r, r, 0, r, r, r);
      grad.addColorStop(0, color);
      grad.addColorStop(0.25, color);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = grad;
      g.beginPath();
      g.arc(r, r, r, 0, Math.PI * 2);
      g.fill();
      glowCache.set(key, c);
      return c;
    }

    function edgePoint() {
      const s = Math.random();
      if (s < 0.25) return { x: Math.random() * width, y: -12 };
      if (s < 0.5) return { x: Math.random() * width, y: height + 12 };
      if (s < 0.75) return { x: -12, y: Math.random() * height };
      return { x: width + 12, y: Math.random() * height };
    }

    // Pick the next straight leg (commit to one axis toward the target) so the
    // path is made of clean right angles with no per-frame 1px toggling.
    function newLeg(sg) {
      const T = targetXY();
      const gx = T.x + sg.ox;
      const gy = T.y + sg.oy;
      const dx = gx - sg.x;
      const dy = gy - sg.y;
      let axis;
      if (Math.abs(dx) < 2) axis = "y";
      else if (Math.abs(dy) < 2) axis = "x";
      else if (Math.random() < 0.6) axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      else axis = Math.random() < 0.5 ? "x" : "y";
      const rem = axis === "x" ? dx : dy;
      const legMax = 40 * (1 + ((Math.random() * 3) | 0)); // 40..160px
      const len = Math.sign(rem) * Math.min(Math.abs(rem), legMax);
      sg.axis = axis;
      sg.legEndX = axis === "x" ? sg.x + len : sg.x;
      sg.legEndY = axis === "y" ? sg.y + len : sg.y;
    }

    function spawnTravel(sg) {
      const p = edgePoint();
      sg.x = p.x;
      sg.y = p.y;
      sg.mode = "travel";
      sg.speed = 150 + Math.random() * 230; // random speed
      sg.color = SIGNAL_COLORS[(Math.random() * SIGNAL_COLORS.length) | 0];
      sg.size = 9 + Math.random() * 13; // random size
      sg.trailLen = 6 + ((Math.random() * 8) | 0); // random style
      sg.lineW = 1 + Math.random() * 1.5;
      sg.ox = (Math.random() - 0.5) * 20;
      sg.oy = (Math.random() - 0.5) * 20;
      sg.trail = [];
      newLeg(sg);
    }

    function enterOrbit(sg) {
      const T = targetXY();
      sg.mode = "orbit";
      sg.orbitT = 0;
      sg.orbitAng = Math.atan2(sg.y - T.y, sg.x - T.x);
      sg.orbitR = Math.max(16, Math.min(48, Math.hypot(sg.x - T.x, sg.y - T.y)));
      sg.orbitDir = Math.random() < 0.5 ? 1 : -1;
      sg.orbitSpd = 1.4 + Math.random() * 1.8;
      sg.fadeT = 0;
    }

    function makePath(a, b) {
      if (a.x === b.x || a.y === b.y) return [a, b];
      const dirX = Math.sign(b.x - a.x);
      const dirY = Math.sign(b.y - a.y);
      const ch = Math.min(16, Math.abs(b.x - a.x) / 2, Math.abs(b.y - a.y) / 2);
      return Math.random() < 0.5
        ? [a, { x: b.x - dirX * ch, y: a.y }, { x: b.x, y: a.y + dirY * ch }, b]
        : [a, { x: a.x, y: b.y - dirY * ch }, { x: a.x + dirX * ch, y: b.y }, b];
    }
    function addLed(x, y) {
      leds.push({
        x, y,
        color: LED_COLORS[(Math.random() * LED_COLORS.length) | 0],
        phase: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 2,
        size: 3 + Math.random() * 2,
      });
    }

    function build() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
      small = width < 768;
      CAP = small ? 55 : 120;
      baseCount = small ? 7 : 14;

      const grid = small ? 38 : 44;
      const cols = Math.max(2, Math.floor(width / grid));
      const rows = Math.max(2, Math.floor(height / grid));
      const oxg = (width - (cols - 1) * grid) / 2;
      const oyg = (height - (rows - 1) * grid) / 2;
      const node = (c, r) => ({ x: oxg + c * grid, y: oyg + r * grid });

      const nWires = Math.min(small ? 24 : 56, Math.floor((width * height) / 12000));
      wires = [];
      leds = [];
      const padPts = [];
      for (let i = 0; i < nWires; i++) {
        const c1 = (Math.random() * cols) | 0;
        const r1 = (Math.random() * rows) | 0;
        const span = 2 + ((Math.random() * 4) | 0);
        const c2 = Math.max(0, Math.min(cols - 1, c1 + (Math.random() < 0.5 ? span : -span)));
        const r2 = Math.max(0, Math.min(rows - 1, r1 + (Math.random() < 0.5 ? span : -span)));
        const a = node(c1, r1);
        const b = node(c2, r2);
        if (a.x === b.x && a.y === b.y) continue;
        wires.push(makePath(a, b));
        padPts.push(a, b);
      }
      for (const p of padPts) if (Math.random() < 0.4) addLed(p.x, p.y);
      const extra = small ? 6 : 14;
      for (let i = 0; i < extra; i++) addLed(node((Math.random() * cols) | 0, (Math.random() * rows) | 0));

      // ambient signals (continuously replenished)
      signals = [];
      for (let i = 0; i < baseCount; i++) {
        const sg = { ambient: true };
        spawnTravel(sg);
        sg.x = Math.random() * width;
        sg.y = Math.random() * height;
        newLeg(sg);
        signals.push(sg);
      }

      staticCanvas = document.createElement("canvas");
      staticCanvas.width = width;
      staticCanvas.height = height;
      const s = staticCanvas.getContext("2d");
      s.strokeStyle = TRACE;
      s.lineWidth = 1.3;
      s.lineJoin = "round";
      for (const pts of wires) {
        s.beginPath();
        s.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) s.lineTo(pts[i].x, pts[i].y);
        s.stroke();
      }
      s.fillStyle = PAD;
      for (const p of padPts) s.fillRect(p.x - 2, p.y - 2, 4, 4);
      for (const l of leds) {
        s.fillStyle = l.color;
        s.beginPath();
        s.arc(l.x, l.y, 1.5, 0, Math.PI * 2);
        s.fill();
      }
    }

    function updateSignal(sg, dt) {
      const T = targetXY();
      if (sg.mode === "travel") {
        // enter orbit before reaching the cursor (kills any 1px jitter)
        if (Math.hypot(T.x + sg.ox - sg.x, T.y + sg.oy - sg.y) <= ORBIT_ENTER) {
          enterOrbit(sg);
        } else {
          const step = sg.speed * dt;
          if (sg.axis === "x") {
            const rem = sg.legEndX - sg.x;
            if (Math.abs(rem) <= step) {
              sg.x = sg.legEndX;
              newLeg(sg);
            } else sg.x += Math.sign(rem) * step;
          } else {
            const rem = sg.legEndY - sg.y;
            if (Math.abs(rem) <= step) {
              sg.y = sg.legEndY;
              newLeg(sg);
            } else sg.y += Math.sign(rem) * step;
          }
        }
      } else {
        // orbit + fade (follows the moving cursor)
        sg.orbitT += dt;
        sg.orbitAng += sg.orbitDir * sg.orbitSpd * dt;
        sg.x = T.x + Math.cos(sg.orbitAng) * sg.orbitR;
        sg.y = T.y + Math.sin(sg.orbitAng) * sg.orbitR;
        if (sg.mode === "orbit" && sg.orbitT >= ORBIT_DUR) sg.mode = "fade";
        if (sg.mode === "fade") {
          sg.fadeT += dt;
          if (sg.fadeT >= FADE_DUR) {
            if (sg.ambient) {
              spawnTravel(sg);
              return 1;
            }
            return 0; // transient -> remove
          }
        }
      }
      sg.trail.push({ x: sg.x, y: sg.y });
      if (sg.trail.length > sg.trailLen) sg.trail.shift();
      return 1;
    }

    function render(now) {
      const time = (now - t0) / 1000;
      const dt = FRAME_MS / 1000;
      ctx.clearRect(0, 0, width, height);
      if (staticCanvas) ctx.drawImage(staticCanvas, 0, 0);

      const T = targetXY();
      ctx.globalCompositeOperation = "lighter";

      // LEDs
      for (const l of leds) {
        let b = 0.5 + 0.5 * Math.sin(time * l.speed + l.phase);
        const dx = l.x - T.x;
        const dy = l.y - T.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 190 * 190) b += (1 - Math.sqrt(d2) / 190) * 1.5;
        const size = l.size * (2.3 + b * 2.6);
        ctx.globalAlpha = Math.min(1, 0.22 + b * 0.6) * glowAlpha;
        ctx.drawImage(glow(l.color, 48), l.x - size / 2, l.y - size / 2, size, size);
      }

      // Signals
      const survivors = [];
      for (const sg of signals) {
        const keep = updateSignal(sg, dt);
        if (!keep) continue;
        const fadeMul =
          sg.mode === "fade" ? Math.max(0, 1 - sg.fadeT / FADE_DUR) : 1;
        if (sg.trail.length > 1) {
          ctx.globalAlpha = 0.4 * glowAlpha * fadeMul;
          ctx.strokeStyle = sg.color;
          ctx.lineWidth = sg.lineW;
          ctx.beginPath();
          ctx.moveTo(sg.trail[0].x, sg.trail[0].y);
          for (let i = 1; i < sg.trail.length; i++) ctx.lineTo(sg.trail[i].x, sg.trail[i].y);
          ctx.stroke();
        }
        ctx.globalAlpha = 0.85 * glowAlpha * fadeMul;
        ctx.drawImage(glow(sg.color, 36), sg.x - sg.size / 2, sg.y - sg.size / 2, sg.size, sg.size);
        survivors.push(sg);
      }
      signals = survivors;

      // subtle focal glow at the cursor (no CPU chip)
      if (mouse.on) {
        ctx.globalAlpha = 0.3 * glowAlpha;
        ctx.drawImage(glow(`rgba(${ACCENT},0.9)`, 180), mouse.x - 55, mouse.y - 55, 110, 110);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    }

    function spawnBurst(n) {
      for (let i = 0; i < n; i++) {
        if (signals.length >= CAP) break;
        const sg = { ambient: false };
        spawnTravel(sg);
        signals.push(sg);
      }
    }

    function loop(now) {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      render(now);
    }
    function start() {
      cancelAnimationFrame(raf);
      if (reduce) render(performance.now());
      else raf = requestAnimationFrame(loop);
    }
    function pause() {
      cancelAnimationFrame(raf);
    }
    function resume() {
      if (!document.hidden) start();
    }
    function onVisibility() {
      if (document.hidden) pause();
      else resume();
    }
    function onMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.on = true;
    }
    function onDown() {
      spawnBurst(10);
    }

    build();
    start();
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", pause);
    window.addEventListener("focus", resume);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", pause);
      window.removeEventListener("focus", resume);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 h-full w-full transition-opacity duration-[1600ms] ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
