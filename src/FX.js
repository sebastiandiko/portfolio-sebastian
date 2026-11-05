import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';

/*
  Capa global de efectos "premium". Todo es decorativo (pointer-events: none)
  y se desactiva solo cuando corresponde:
    - spotlight / imanes: solo en dispositivos con mouse
    - todo el movimiento: se apaga con prefers-reduced-motion
*/

const grainShift = keyframes`
  0%   { transform: translate(0, 0); }
  20%  { transform: translate(-3%, 2%); }
  40%  { transform: translate(2%, -3%); }
  60%  { transform: translate(-2%, -1%); }
  80%  { transform: translate(3%, 3%); }
  100% { transform: translate(0, 0); }
`;

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(111, 227, 193, 0.15), var(--accent));
  box-shadow: 0 0 12px var(--accent-glow);
  transform-origin: 0 50%;
  z-index: 9998;
  pointer-events: none;
`;

const Grain = styled.div`
  position: fixed;
  inset: -50%;
  width: 200%;
  height: 200%;
  z-index: 9990;
  pointer-events: none;
  opacity: 0.055;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.2 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  animation: ${grainShift} 1.2s steps(6) infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Spotlight = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9980;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease;
  background: radial-gradient(
    520px circle at var(--fx-x, 50%) var(--fx-y, 50%),
    rgba(111, 227, 193, 0.075),
    transparent 65%
  );
  mix-blend-mode: screen;

  &.on {
    opacity: 1;
  }
`;

const MAGNET_STRENGTH = 0.28;

const FX = () => {
  const spotRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return undefined;

    const spot = spotRef.current;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const spotPos = { ...target };
    let magnet = null; // { el, tx, ty, cx, cy }
    const settling = new Set(); // elementos volviendo a su sitio
    let visible = false;
    let frame;

    const show = () => {
      if (visible) return;
      visible = true;
      spot.classList.add('on');
    };
    const hide = () => {
      visible = false;
      spot.classList.remove('on');
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      show();
      if (magnet) {
        const r = magnet.el.getBoundingClientRect();
        // r incluye el desplazamiento actual: lo restamos para medir desde el centro real
        const cx = r.left + r.width / 2 - magnet.cx;
        const cy = r.top + r.height / 2 - magnet.cy;
        magnet.tx = (e.clientX - cx) * MAGNET_STRENGTH;
        magnet.ty = (e.clientY - cy) * MAGNET_STRENGTH;
      }
    };

    const onOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const m = t.closest('[data-magnetic]');
      if (m && (!magnet || magnet.el !== m)) {
        if (magnet) settling.add(magnet);
        const existing = [...settling].find((s) => s.el === m);
        if (existing) settling.delete(existing);
        magnet = existing || { el: m, tx: 0, ty: 0, cx: 0, cy: 0 };
      } else if (!m && magnet) {
        magnet.tx = 0;
        magnet.ty = 0;
        settling.add(magnet);
        magnet = null;
      }
    };

    const onLeaveDoc = () => hide();

    const tick = () => {
      spotPos.x += (target.x - spotPos.x) * 0.08;
      spotPos.y += (target.y - spotPos.y) * 0.08;

      spot.style.setProperty('--fx-x', `${spotPos.x}px`);
      spot.style.setProperty('--fx-y', `${spotPos.y}px`);

      const step = (m) => {
        m.cx += (m.tx - m.cx) * 0.18;
        m.cy += (m.ty - m.cy) * 0.18;
        m.el.style.translate = `${m.cx.toFixed(2)}px ${m.cy.toFixed(2)}px`;
      };
      if (magnet) step(magnet);
      settling.forEach((m) => {
        step(m);
        if (Math.abs(m.cx) < 0.05 && Math.abs(m.cy) < 0.05) {
          m.el.style.translate = '';
          settling.delete(m);
        }
      });

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeaveDoc);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeaveDoc);
      if (magnet) magnet.el.style.translate = '';
      settling.forEach((m) => {
        m.el.style.translate = '';
      });
    };
  }, []);

  return (
    <>
      <ProgressBar style={{ scaleX }} />
      <Spotlight ref={spotRef} />
      <Grain />
    </>
  );
};

export default FX;
