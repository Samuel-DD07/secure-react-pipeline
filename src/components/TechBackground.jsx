"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Animated "motherboard / circuit board" background: PCB-style traces with
 * pads, multi-color LEDs that pulse, and signals travelling along the traces.
 * Reacts to the mouse: LEDs near the cursor brighten and a soft glow follows it.
 *
 * Performance-minded: DPR pinned to 1, throttled to ~30fps, the static trace
 * layer is pre-rendered once to an offscreen canvas and blitted each frame,
 * glows are pre-baked sprites drawn with additive compositing, fewer elements
 * on small screens, and it pauses when the tab/window loses focus.
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

    // Palette (on-brand violet/indigo, with a few RGB LED accents)
    const TRACE = isDark ? "rgba(139,92,246,0.18)" : "rgba(99,102,241,0.14)";
    const PAD = isDark ? "rgba(167,139,250,0.5)" : "rgba(99,102,241,0.4)";
    const LED_COLORS = [
      "#8B5CF6",
      "#6366F1",
      "#8B5CF6",
      "#22D3EE",
      "#34D399",
      "#F472B6",
      "#FBBF24",
    ];
    const SIGNAL_COLOR = "#A78BFA";
    const glowAlpha = isDark ? 1 : 0.7;

    let width = 0;
    let height = 0;
    let wires = [];
    let leds = [];
    let signals = [];
    let staticCanvas = null;
    let raf = 0;
    let last = 0;
    let t0 = performance.now();
    const FRAME_MS = 1000 / 30;

    const mouse = { x: -9999, y: -9999 };
    const MOUSE_R = 170;

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
      g.globalAlpha = 0.9;
      g.fillStyle = grad;
      g.beginPath();
      g.arc(r, r, r, 0, Math.PI * 2);
      g.fill();
      glowCache.set(key, c);
      return c;
    }
    const mouseGlow = () => glow("rgba(139,92,246,0.9)", 320);

    // --- polyline helpers ------------------------------------------------
    function makeWire(points) {
      const segs = [];
      let total = 0;
      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i];
        const b = points[i + 1];
        const len = Math.hypot(b.x - a.x, b.y - a.y);
        segs.push({ a, b, len, acc: total });
        total += len;
      }
      return { points, segs, total: total || 1 };
    }
    function pointAt(w, d) {
      d = ((d % w.total) + w.total) % w.total;
      for (const s of w.segs) {
        if (d <= s.acc + s.len) {
          const t = s.len ? (d - s.acc) / s.len : 0;
          return { x: s.a.x + (s.b.x - s.a.x) * t, y: s.a.y + (s.b.y - s.a.y) * t };
        }
      }
      const l = w.segs[w.segs.length - 1];
      return { x: l.b.x, y: l.b.y };
    }
    // Orthogonal route with a 45° chamfered corner (classic PCB look)
    function route(a, b) {
      if (a.x === b.x || a.y === b.y) return [a, b];
      const dirX = Math.sign(b.x - a.x);
      const dirY = Math.sign(b.y - a.y);
      const ch = Math.min(16, Math.abs(b.x - a.x) / 2, Math.abs(b.y - a.y) / 2);
      if (Math.random() < 0.5) {
        // horizontal first
        return [
          a,
          { x: b.x - dirX * ch, y: a.y },
          { x: b.x, y: a.y + dirY * ch },
          b,
        ];
      }
      // vertical first
      return [
        a,
        { x: a.x, y: b.y - dirY * ch },
        { x: a.x + dirX * ch, y: b.y },
        b,
      ];
    }

    function build() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;

      const small = width < 768;
      const grid = small ? 40 : 46;
      const cols = Math.max(2, Math.floor(width / grid));
      const rows = Math.max(2, Math.floor(height / grid));
      const ox = (width - (cols - 1) * grid) / 2;
      const oy = (height - (rows - 1) * grid) / 2;
      const node = (c, r) => ({ x: ox + c * grid, y: oy + r * grid });

      const cap = small ? 26 : 64;
      const nWires = Math.min(cap, Math.floor((width * height) / 12000));

      wires = [];
      leds = [];
      signals = [];
      const padPts = [];

      for (let i = 0; i < nWires; i++) {
        const c1 = Math.floor(Math.random() * cols);
        const r1 = Math.floor(Math.random() * rows);
        const span = 2 + Math.floor(Math.random() * 4);
        const c2 = Math.max(0, Math.min(cols - 1, c1 + (Math.random() < 0.5 ? span : -span)));
        const r2 = Math.max(0, Math.min(rows - 1, r1 + (Math.random() < 0.5 ? span : -span)));
        const a = node(c1, r1);
        const b = node(c2, r2);
        if (a.x === b.x && a.y === b.y) continue;
        const w = makeWire(route(a, b));
        wires.push(w);
        padPts.push(a, b);
      }

      // LEDs at a subset of pads
      for (const p of padPts) {
        if (Math.random() < 0.55) {
          leds.push({
            x: p.x,
            y: p.y,
            color: LED_COLORS[(Math.random() * LED_COLORS.length) | 0],
            phase: Math.random() * Math.PI * 2,
            speed: 0.8 + Math.random() * 1.8,
            size: 3 + Math.random() * 2,
          });
        }
      }

      // Signals travelling along wires
      const nSig = Math.min(small ? 10 : 30, Math.floor(wires.length * 0.5));
      for (let i = 0; i < nSig; i++) {
        const wi = (Math.random() * wires.length) | 0;
        signals.push({
          wi,
          d: Math.random() * wires[wi].total,
          speed: 26 + Math.random() * 40, // px/sec
        });
      }

      // Pre-render the static layer (traces + pads)
      staticCanvas = document.createElement("canvas");
      staticCanvas.width = width;
      staticCanvas.height = height;
      const s = staticCanvas.getContext("2d");
      s.strokeStyle = TRACE;
      s.lineWidth = 1.4;
      s.lineJoin = "round";
      for (const w of wires) {
        s.beginPath();
        s.moveTo(w.points[0].x, w.points[0].y);
        for (let i = 1; i < w.points.length; i++) s.lineTo(w.points[i].x, w.points[i].y);
        s.stroke();
      }
      s.fillStyle = PAD;
      for (const p of padPts) s.fillRect(p.x - 2, p.y - 2, 4, 4);
      // LED cores (bright dots)
      for (const l of leds) {
        s.fillStyle = l.color;
        s.beginPath();
        s.arc(l.x, l.y, 1.6, 0, Math.PI * 2);
        s.fill();
      }
    }

    function render(now) {
      const time = (now - t0) / 1000;
      ctx.clearRect(0, 0, width, height);
      if (staticCanvas) ctx.drawImage(staticCanvas, 0, 0);

      ctx.globalCompositeOperation = "lighter";

      // Mouse glow (follows the cursor)
      if (mouse.x > -9998) {
        ctx.globalAlpha = 0.45 * glowAlpha;
        ctx.drawImage(mouseGlow(), mouse.x - 160, mouse.y - 160, 320, 320);
      }

      // LEDs
      for (const l of leds) {
        let b = 0.5 + 0.5 * Math.sin(time * l.speed + l.phase); // 0..1
        if (mouse.x > -9998) {
          const dx = l.x - mouse.x;
          const dy = l.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_R * MOUSE_R) {
            b += (1 - Math.sqrt(d2) / MOUSE_R) * 1.6;
          }
        }
        const size = l.size * (2.4 + b * 2.6);
        ctx.globalAlpha = Math.min(1, 0.25 + b * 0.6) * glowAlpha;
        const sp = glow(l.color, 48);
        ctx.drawImage(sp, l.x - size / 2, l.y - size / 2, size, size);
      }

      // Signals
      const dt = FRAME_MS / 1000;
      const sig = glow(SIGNAL_COLOR, 40);
      for (const sg of signals) {
        sg.d += sg.speed * dt;
        const w = wires[sg.wi];
        const head = pointAt(w, sg.d);
        const tail = pointAt(w, sg.d - 22);
        // trailing bright segment
        ctx.globalAlpha = 0.5 * glowAlpha;
        ctx.strokeStyle = SIGNAL_COLOR;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(head.x, head.y);
        ctx.stroke();
        // head glow
        ctx.globalAlpha = 0.8 * glowAlpha;
        ctx.drawImage(sig, head.x - 9, head.y - 9, 18, 18);
      }

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
    }
    function onLeave() {
      mouse.x = mouse.y = -9999;
    }
    function onResize() {
      build();
    }

    build();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", pause);
    window.addEventListener("focus", resume);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
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
