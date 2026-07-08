"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Subtle animated "tech" background: a slowly drifting particle network
 * drawn on a fixed full-viewport canvas behind all content.
 *
 * Performance-minded: device pixel ratio pinned to 1 (the field is soft, so
 * retina resolution is wasted work), throttled to ~30fps, squared-distance
 * checks in the O(n^2) link loop, fewer particles on small screens, and it
 * pauses when the tab/window is not in focus.
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
    const rgb = isDark ? "139, 92, 246" : "99, 102, 241";
    const lineAlpha = isDark ? 0.35 : 0.22;
    const dotAlpha = isDark ? 0.9 : 0.6;
    const dotRadius = 2;

    let width = 0;
    let height = 0;
    let particles = [];
    let raf = 0;
    let last = 0;

    const FRAME_MS = 1000 / 30; // throttle to ~30fps
    let LINK_DIST = 140;
    let LINK_DIST_SQ = LINK_DIST * LINK_DIST;

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      // DPR pinned to 1 on purpose (huge perf win on retina/4K screens).
      canvas.width = width;
      canvas.height = height;

      const small = width < 768;
      LINK_DIST = small ? 120 : 140;
      LINK_DIST_SQ = LINK_DIST * LINK_DIST;
      const cap = small ? 34 : 80;
      const count = Math.min(cap, Math.floor((width * height) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += width;
        else if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        else if (p.y > height) p.y -= height;
      }

      // Links (squared-distance check; sqrt only when actually drawing)
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST_SQ) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * lineAlpha;
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = `rgba(${rgb}, ${dotAlpha})`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop(t) {
      raf = requestAnimationFrame(loop);
      if (t - last < FRAME_MS) return;
      last = t;
      render();
    }

    function start() {
      cancelAnimationFrame(raf);
      if (reduce) render();
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

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", pause);
    window.addEventListener("focus", resume);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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
