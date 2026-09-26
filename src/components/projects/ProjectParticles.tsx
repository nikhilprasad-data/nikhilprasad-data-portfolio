'use client';

import { useEffect, useRef } from 'react';
import styles from './ProjectShowcase.module.css';

type ParticleKind = 'pii' | 'teams';

interface Particle {
  phase: number;
  depth: number;
  lane: number;
  group: number;
  speed: number;
  radius: number;
}

interface ProjectParticlesProps {
  kind: ParticleKind;
}

const MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const MOBILE_QUERY = '(max-width: 600px)';

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => ({
    phase: (index * 0.61803398875) % 1,
    depth: 0.15 + ((index * 37) % count) / count * 0.85,
    lane: ((index * 17) % 101) / 100,
    group: index % 4,
    speed: 0.035 + ((index * 13) % 7) * 0.002,
    radius: 0.65 + ((index * 19) % 5) * 0.12,
  }));
}

export default function ProjectParticles({ kind }: ProjectParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!container || !canvas || !context) return;

    const reducedMotion = window.matchMedia(MOTION_QUERY);
    const mobileLayout = window.matchMedia(MOBILE_QUERY);
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastDraw = 0;
    let inView = false;

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      particles = makeParticles(mobileLayout.matches ? 24 : 64);
      draw(0);
    };

    const draw = (elapsed: number) => {
      context.clearRect(0, 0, width, height);

      const cohesion = 0.5 + Math.sin(elapsed * 0.42) * 0.5;
      const rendered = particles.map((particle) => {
        const phase = (elapsed * particle.speed * (0.55 + particle.depth * 1.1) + particle.phase) % 1;
        const depthScale = 0.48 + particle.depth * 1.05;
        let x: number;
        let y: number;
        let fade = 1;

        if (kind === 'pii') {
          const converge = Math.min(1, phase / 0.46);
          const diverge = Math.max(0, (phase - 0.58) / 0.42);
          x = phase < 0.58 ? -0.06 + converge * 0.56 : 0.5 + diverge * 0.62;
          y = phase < 0.58
            ? particle.lane + (0.5 - particle.lane) * converge
            : 0.5 + (particle.lane - 0.5) * diverge * 1.15;
          if (phase > 0.94) fade = (1 - phase) / 0.06;
        } else {
          const converge = Math.min(1, phase / 0.52);
          const diverge = Math.max(0, (phase - 0.58) / 0.42);
          const spread = phase < 0.58 ? 1 - converge * 0.78 : 0.22 + diverge * 0.78;
          const laneX = 0.12 + particle.lane * 0.76;
          const laneY = 0.1 + ((particle.lane * 0.73 + particle.group * 0.19) % 1) * 0.8;
          const drift = Math.sin(elapsed * (0.2 + particle.depth * 0.14) + particle.phase * Math.PI * 2);
          x = 0.5 + (laneX - 0.5) * spread + drift * 0.025;
          y = 0.5 + (laneY - 0.5) * spread + Math.cos(elapsed * 0.24 + particle.phase * 9) * 0.025;
        }

        const perspective = 0.72 + particle.depth * 0.48;
        return {
          x: x * width,
          y: height * (0.5 + (y - 0.5) * perspective),
          alpha: (0.035 + particle.depth * 0.085) * fade,
          radius: particle.radius * depthScale,
          group: particle.group,
        };
      });

      if (kind === 'teams') {
        context.lineWidth = 0.65;
        for (let group = 0; group < 4; group += 1) {
          const members = rendered.filter((particle) => particle.group === group);
          if (members.length < 2) continue;
          const anchorX = members.reduce((sum, particle) => sum + particle.x, 0) / members.length;
          const anchorY = members.reduce((sum, particle) => sum + particle.y, 0) / members.length;
          context.strokeStyle = `rgba(61, 255, 160, ${0.012 + cohesion * 0.018})`;
          for (let index = 0; index < members.length; index += 4) {
            context.beginPath();
            context.moveTo(anchorX, anchorY);
            context.lineTo(members[index].x, members[index].y);
            context.stroke();
          }
        }
      }

      for (const particle of rendered) {
        if (particle.x < -4 || particle.x > width + 4 || particle.alpha <= 0) continue;
        context.beginPath();
        context.fillStyle = `rgba(130, 255, 204, ${particle.alpha})`;
        context.shadowColor = 'rgba(61, 255, 160, 0.38)';
        context.shadowBlur = particle.radius * 1.5;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
      context.shadowBlur = 0;
    };

    const animate = (now: number) => {
      if (now - lastDraw >= 33) {
        lastDraw = now;
        draw(now * 0.001);
      }
      frame = window.requestAnimationFrame(animate);
    };

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const updateAnimation = () => {
      stop();
      if (!inView || document.hidden) return;
      if (reducedMotion.matches) {
        draw(0);
        return;
      }
      frame = window.requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateAnimation();
    }, { threshold: 0.05 });

    observer.observe(container);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    document.addEventListener('visibilitychange', updateAnimation);
    reducedMotion.addEventListener('change', updateAnimation);
    mobileLayout.addEventListener('change', resize);
    resize();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', updateAnimation);
      reducedMotion.removeEventListener('change', updateAnimation);
      mobileLayout.removeEventListener('change', resize);
    };
  }, [kind]);

  return (
    <div ref={containerRef} className={styles.particleLayer} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.particleCanvas} />
    </div>
  );
}
