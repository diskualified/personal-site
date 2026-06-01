"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  phase: number;
  speed: number;
}

export default function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0,
      H = 0,
      raf = 0,
      t = 0;

    const particles: Particle[] = [];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function spawn(): Particle {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.18 + 0.04),
        r: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.1 + 0.02,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.4 + 0.25,
      };
    }

    resize();
    for (let i = 0; i < 120; i++) particles.push(spawn());

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.007;

      for (const p of particles) {
        const drift = Math.sin(t * p.speed + p.phase) * 0.28;
        p.x += p.vx + drift;
        p.y += p.vy;

        if (p.y < -6 || p.x < -6 || p.x > W + 6) {
          p.x = Math.random() * W;
          p.y = H + 4;
          p.phase = Math.random() * Math.PI * 2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140,140,140,${p.alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
