"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Animated "motherboard" background: PCB-style traces, pads and lots of
 * multi-color pulsing LEDs. Data signals stream in from the edges and
 * CONVERGE toward the cursor, which is drawn as a glowing CPU/processor chip
 * that pulses each time a signal reaches it. Falls back to the viewport center
 * when there is no cursor.
 *
 * Performance-minded: DPR pinned to 1, ~30fps throttle, the static trace layer
 * is pre-rendered once to an offscreen canvas and blitted, glows are pre-baked
 * additive sprites, fewer elements on small screens, pauses when unfocused.
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
    const LED_COLORS = [
      "#8B5CF6",
      "#6366F1",
      "#8B5CF6",
      "#22D3EE",
      "#34D399",
      "#F472B6",
      "#FBBF24",
    ];
    const SIGNAL_COLORS = ["#A78BFA", "#22D3EE", "#818CF8", "#34D399", "#F472B6"];
    const chipBody = isDark ? "#0b0b14" : "#e7e7f6";
    const glowAlpha = isDark ? 1 : 0.72;

    let width = 0;
    let height = 0;
    let wires = [];
    let leds = [];
    let signals = [];
    let staticCanvas = null;
    let raf = 0;
    let last = 0;
    const t0 = performance.now();
    const FRAME_MS = 1000 / 30;
    let cpuPulse = 0;

    const mouse = { x: -9999, y: -9999, on: false };

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
    function spawnSignal(sg) {
      const p = edgePoint();
      sg.x = p.x;
      sg.y = p.y;
      sg.speed = 130 + Math.random() * 160;
      sg.color = SIGNAL_COLORS[(Math.random() * SIGNAL_COLORS.length) | 0];
      sg.trail = [];
    }

    // static PCB traces (decorative)
    function makePath(a, b) {
      if (a.x === b.x || a.y === b.y) return [a, b];
      const dirX = Math.sign(b.x - a.x);
      const dirY = Math.sign(b.y - a.y);
      const ch = Math.min(16, Math.abs(b.x - a.x) / 2, Math.abs(b.y - a.y) / 2);
      return Math.random() < 0.5
        ? [a, { x: b.x - dirX * ch, y: a.y }, { x: b.x, y: a.y + dirY * ch }, b]
        : [a, { x: a.x, y: b.y - dirY * ch }, { x: a.x + dirX * ch, y: b.y }, b];
    }

    function build() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;

      const small = width < 768;
      const grid = small ? 38 : 44;
      const cols = Math.max(2, Math.floor(width / grid));
      const rows = Math.max(2, Math.floor(height / grid));
      const ox = (width - (cols - 1) * grid) / 2;
      const oy = (height - (rows - 1) * grid) / 2;
      const node = (c, r) => ({ x: ox + c * grid, y: oy + r * grid });

      const nWires = Math.min(small ? 34 : 80, Math.floor((width * height) / 10000));
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

      // LEDs: most pads + extra scattered nodes
      for (const p of padPts) {
        if (Math.random() < 0.82) addLed(p.x, p.y);
      }
      const extra = small ? 18 : 46;
      for (let i = 0; i < extra; i++) {
        addLed(node((Math.random() * cols) | 0, (Math.random() * rows) | 0));
      }

      // converging signals
      const nSig = Math.min(small ? 26 : 72, Math.floor((width * height) / 15000));
      signals = Array.from({ length: nSig }, () => {
        const sg = {};
        spawnSignal(sg);
        // stagger start positions across the field
        sg.x = Math.random() * width;
        sg.y = Math.random() * height;
        return sg;
      });

      // pre-render static layer
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
    function addLed(x, y) {
      leds.push({
        x,
        y,
        color: LED_COLORS[(Math.random() * LED_COLORS.length) | 0],
        phase: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 2,
        size: 3 + Math.random() * 2,
      });
    }

    function drawCPU(cx, cy) {
      const pulse = cpuPulse;
      // glow
      ctx.globalCompositeOperation = "lighter";
      const gs = 150 + pulse * 26;
      ctx.globalAlpha = Math.min(0.85, 0.42 + pulse * 0.13) * glowAlpha;
      ctx.drawImage(glow(`rgba(${ACCENT},0.95)`, 256), cx - gs / 2, cy - gs / 2, gs, gs);

      // chip body
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      const h = 22;
      // pins
      ctx.strokeStyle = `rgba(${ACCENT},0.9)`;
      ctx.lineWidth = 2;
      for (let i = -1; i <= 1; i++) {
        const off = i * 9;
        ctx.beginPath(); ctx.moveTo(cx - h - 6, cy + off); ctx.lineTo(cx - h, cy + off); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx + h, cy + off); ctx.lineTo(cx + h + 6, cy + off); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx + off, cy - h - 6); ctx.lineTo(cx + off, cy - h); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx + off, cy + h); ctx.lineTo(cx + off, cy + h + 6); ctx.stroke();
      }
      ctx.fillStyle = chipBody;
      ctx.fillRect(cx - h, cy - h, h * 2, h * 2);
      ctx.strokeStyle = `rgba(${ACCENT},${0.85 + Math.min(0.15, pulse * 0.1)})`;
      ctx.lineWidth = 1.6;
      ctx.strokeRect(cx - h, cy - h, h * 2, h * 2);
      // inner core
      ctx.fillStyle = `rgba(${ACCENT},${0.35 + Math.min(0.5, pulse * 0.2)})`;
      ctx.fillRect(cx - 7, cy - 7, 14, 14);
    }

    function render(now) {
      const time = (now - t0) / 1000;
      const dt = FRAME_MS / 1000;
      ctx.clearRect(0, 0, width, height);
      if (staticCanvas) ctx.drawImage(staticCanvas, 0, 0);

      const tx = mouse.on ? mouse.x : width * 0.5;
      const ty = mouse.on ? mouse.y : height * 0.45;

      ctx.globalCompositeOperation = "lighter";

      // LEDs (pulse + proximity to cursor)
      for (const l of leds) {
        let b = 0.5 + 0.5 * Math.sin(time * l.speed + l.phase);
        const dx = l.x - tx;
        const dy = l.y - ty;
        const d2 = dx * dx + dy * dy;
        if (d2 < 190 * 190) b += (1 - Math.sqrt(d2) / 190) * 1.5;
        const size = l.size * (2.3 + b * 2.6);
        ctx.globalAlpha = Math.min(1, 0.22 + b * 0.6) * glowAlpha;
        ctx.drawImage(glow(l.color, 48), l.x - size / 2, l.y - size / 2, size, size);
      }

      // Signals converging toward the cursor (Manhattan approach)
      cpuPulse = Math.max(0, cpuPulse - dt * 3);
      for (const sg of signals) {
        const dx = tx - sg.x;
        const dy = ty - sg.y;
        if (Math.abs(dx) + Math.abs(dy) < 26) {
          cpuPulse = Math.min(3, cpuPulse + 0.5);
          spawnSignal(sg);
          continue;
        }
        const step = sg.speed * dt;
        if (Math.abs(dx) > Math.abs(dy)) sg.x += Math.sign(dx) * Math.min(step, Math.abs(dx));
        else sg.y += Math.sign(dy) * Math.min(step, Math.abs(dy));
        sg.trail.push({ x: sg.x, y: sg.y });
        if (sg.trail.length > 14) sg.trail.shift();

        // trail
        if (sg.trail.length > 1) {
          ctx.globalAlpha = 0.4 * glowAlpha;
          ctx.strokeStyle = sg.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(sg.trail[0].x, sg.trail[0].y);
          for (let i = 1; i < sg.trail.length; i++) ctx.lineTo(sg.trail[i].x, sg.trail[i].y);
          ctx.stroke();
        }
        // head
        ctx.globalAlpha = 0.85 * glowAlpha;
        ctx.drawImage(glow(sg.color, 36), sg.x - 8, sg.y - 8, 16, 16);
      }

      // CPU chip at the cursor
      drawCPU(tx, ty);

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
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
    function onLeave() {
      mouse.on = false;
    }

    build();
    start();
    window.addEventListener("resize", build);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", pause);
    window.addEventListener("focus", resume);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
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
