"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Subtle animated "tech" background: a slowly drifting particle network
 * (constellation) drawn on a fixed full-viewport canvas behind all content.
 * Theme-aware, pauses when the tab is hidden, respects reduced motion.
 */
export default function TechBackground() {
  const canvasRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const [visible, setVisible] = useState(false);

  // Fade the background in gradually once the page has mounted.
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
    // Accent violet/indigo; a touch stronger on light backgrounds.
    const rgb = isDark ? "139, 92, 246" : "99, 102, 241";
    const lineAlpha = isDark ? 0.35 : 0.22;
    const dotAlpha = isDark ? 0.9 : 0.6;
    const dotRadius = 2.1;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let raf = 0;

    const LINK_DIST = 165;

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(150, Math.floor((width * height) / 11000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += width;
        else if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        else if (p.y > height) p.y -= height;
      }

      // Links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * lineAlpha;
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Dots
      ctx.fillStyle = `rgba(${rgb}, ${dotAlpha})`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    function drawStatic() {
      // Reduced motion: render one static frame.
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(${rgb}, ${dotAlpha})`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function start() {
      cancelAnimationFrame(raf);
      if (reduce) drawStatic();
      else raf = requestAnimationFrame(draw);
    }

    // Pause the animation whenever the visitor leaves the site:
    // switching tab / minimizing (visibilitychange) or focusing another
    // window (blur). Resume only when back and visible.
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
