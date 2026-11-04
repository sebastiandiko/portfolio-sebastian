import React, { useRef, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion, useMotionValueEvent } from 'framer-motion';
import { FaReact, FaJs, FaGitAlt, FaProjectDiagram } from 'react-icons/fa';
import {
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiAmazonwebservices,
  SiPowerbi,
  SiGooglegemini,
  SiOpenai,
  SiLinear,
  SiAdobe,
} from 'react-icons/si';
import { DiTerminal, DiJava } from 'react-icons/di';
import { useTranslation } from 'react-i18next';
import shineHover from './shineEffect';
import knifeImg from './assets/swiss-knife.png';

const TechSection = styled.section`
  background-color: var(--surface-1);
  color: var(--text);
  text-align: center;
  padding: 70px 20px 120px;
  position: relative;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  overflow-x: clip;

  @media (max-width: 768px) {
    padding: 50px 15px 80px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 60px;
  letter-spacing: -0.03em;
  display: inline-block;
  ${shineHover('linear-gradient(180deg, var(--text-hi) 0%, var(--text-2) 100%)')}
`;

const MainRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 130px;
  text-align: left;

  @media (max-width: 1100px) {
    gap: 90px;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 56px;
  }
`;

const ambientDrift = keyframes`
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
`;

const KnifeColumn = styled.div`
  flex-shrink: 0;
  width: 300px;
  position: relative;

  @media (hover: hover) and (pointer: fine) {
    perspective: 1000px;
  }

  @media (max-width: 900px) {
    width: 220px;
  }

  @media (max-width: 480px) {
    width: 170px;
  }
`;

const AmbientGlow = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  width: 220%;
  height: 220%;
  background: radial-gradient(circle, rgba(159, 180, 255, 0.09) 0%, transparent 65%);
  filter: blur(10px);
  animation: ${ambientDrift} 7s ease-in-out infinite;
  pointer-events: none;
`;

const ContactShadow = styled.div`
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 24px;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, transparent 75%);
  border-radius: 50%;
  z-index: 1;
  pointer-events: none;
`;

const TiltInner = styled(motion.div)`
  position: relative;
  width: 100%;
  will-change: transform;

  @media (hover: hover) and (pointer: fine) {
    transform-style: preserve-3d;
  }
`;

/* La navaja se arma con piezas: cada una es la imagen completa recortada
   con clip-path, así al ensamblarse no quedan costuras. */
const KnifeStage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1024 / 1536;
  z-index: 2;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
`;

const KnifePiece = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
  will-change: transform, opacity;
`;

const CarouselColumn = styled.div`
  flex: 1;
  width: 100%;
  max-width: 460px;
`;

const CarouselContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 480px;
  ${(p) => p.$static && 'height: auto; overflow: visible;'}

  &::before, &::after {
    ${(p) => p.$static && 'display: none;'}
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    top: 0;
    background: linear-gradient(to bottom, var(--surface-1) 0%, transparent 100%);
  }

  &::after {
    bottom: 0;
    background: linear-gradient(to top, var(--surface-1) 0%, transparent 100%);
  }

  @media (max-width: 900px) {
    height: 380px;
  }

  @media (max-width: 480px) {
    height: 320px;
  }
`;

/* Scroller nativo: rueda, trackpad y dedo funcionan solos */
const TechScroller = styled.div`
  position: absolute;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: auto;
  -webkit-overflow-scrolling: touch;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;

  &.dragging {
    cursor: grabbing;
  }
  scrollbar-width: none;
  touch-action: pan-y;

  &::-webkit-scrollbar {
    display: none;
  }

  ${(p) => p.$static && 'position: static; overflow: visible; cursor: default;'}
`;

const TechTrack = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 14px;
  box-sizing: border-box;
`;

const TechCard = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
  padding: 16px 22px;
  border-radius: 18px;
  margin-bottom: 16px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  /* --f: 0 (lejos del centro) → 1 (en foco). Lo escribe el scroll. */
  --f: 0;
  opacity: calc(0.32 + var(--f) * 0.68);
  transform: translateX(calc(var(--f) * 10px)) scale(calc(0.94 + var(--f) * 0.06));
  border-color: color-mix(in srgb, var(--accent) calc(var(--f) * 45%), rgba(232, 234, 255, 0.09));
  background: rgba(232, 234, 255, calc(0.02 + var(--f) * 0.05));
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 calc(var(--f) * 28px) rgba(159, 180, 255, calc(var(--f) * 0.16));
  cursor: default;

  h3 {
    font-size: 0.95rem;
    font-weight: 500;
    color: color-mix(in srgb, var(--text-hi) calc(var(--f) * 100%), var(--text-2));
  }

  svg {
    color: color-mix(in srgb, var(--accent) calc(var(--f) * 100%), var(--text-2));
    font-size: 1.8rem;
    flex-shrink: 0;
  }

  ${(p) => p.$static && '--f: 0.6;'}
`;

const IconGroup = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  flex-shrink: 0;
`;

const N8nIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.001 0l-4.14 2.19v9.117L4.14 13.26v4.618l3.72-1.968v-9.117l3.72-1.968v9.117l3.72-1.968V2.834L12.001 0zm0 10.74l4.14-2.19v-4.62l-4.14 2.19v4.62zm0 13.26l4.14-2.19v-9.117l3.72-1.968v-4.618l-3.72 1.968v9.117l-3.72 1.968v-9.117l-3.72 1.968v4.618l7.44 3.936z"/>
  </svg>
);

/* ---- Navaja: fragmentos irregulares (grietas dentadas) que se ensamblan con el scroll ----
   Los vértices y puntos de las grietas se comparten entre piezas vecinas,
   así encajan exacto como un rompecabezas. */
const KNIFE_COLS = 4;
const KNIFE_ROWS = 6;

const rnd = (a, b, c) => {
  const v = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453;
  return v - Math.floor(v);
};

const buildPieces = () => {
  const cw = 100 / KNIFE_COLS;
  const ch = 100 / KNIFE_ROWS;
  const V = [];
  for (let r = 0; r <= KNIFE_ROWS; r += 1) {
    V[r] = [];
    for (let c = 0; c <= KNIFE_COLS; c += 1) {
      const onX = c === 0 || c === KNIFE_COLS;
      const onY = r === 0 || r === KNIFE_ROWS;
      V[r][c] = [
        c * cw + (onX ? 0 : (rnd(r, c, 1) - 0.5) * cw * 0.55),
        r * ch + (onY ? 0 : (rnd(r, c, 2) - 0.5) * ch * 0.55),
      ];
    }
  }
  // dos puntos intermedios por arista, desplazados de forma perpendicular
  const crack = (A, B, seed, perp, border) => {
    const dx = B[0] - A[0];
    const dy = B[1] - A[1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    return [0.33, 0.67].map((t, k) => {
      const o = border ? 0 : (rnd(seed, k, 9) - 0.5) * perp;
      return [A[0] + dx * t + nx * o, A[1] + dy * t + ny * o];
    });
  };
  const H = []; // aristas horizontales: H[r][c] de V[r][c] a V[r][c+1]
  for (let r = 0; r <= KNIFE_ROWS; r += 1) {
    H[r] = [];
    for (let c = 0; c < KNIFE_COLS; c += 1) {
      H[r][c] = crack(V[r][c], V[r][c + 1], r * 17 + c + 100, ch * 0.5, r === 0 || r === KNIFE_ROWS);
    }
  }
  const Vt = []; // aristas verticales: Vt[r][c] de V[r][c] a V[r+1][c]
  for (let r = 0; r < KNIFE_ROWS; r += 1) {
    Vt[r] = [];
    for (let c = 0; c <= KNIFE_COLS; c += 1) {
      Vt[r][c] = crack(V[r][c], V[r + 1][c], r * 13 + c + 300, cw * 0.5, c === 0 || c === KNIFE_COLS);
    }
  }

  const pieces = [];
  for (let r = 0; r < KNIFE_ROWS; r += 1) {
    for (let c = 0; c < KNIFE_COLS; c += 1) {
      const pts = [
        V[r][c],
        ...H[r][c],
        V[r][c + 1],
        ...Vt[r][c + 1],
        V[r + 1][c + 1],
        ...[...H[r + 1][c]].reverse(),
        V[r + 1][c],
        ...[...Vt[r][c]].reverse(),
      ];
      const i = r * KNIFE_COLS + c;
      const mx = pts.reduce((a, p) => a + p[0], 0) / pts.length;
      const my = pts.reduce((a, p) => a + p[1], 0) / pts.length;
      const cx = mx / 100 - 0.5;
      const cy = my / 100 - 0.5;
      const clip = `polygon(${pts.map((p) => `${p[0].toFixed(2)}% ${p[1].toFixed(2)}%`).join(', ')})`;
      pieces.push({
        clip,
        x: cx * 560 + (rnd(i, 1, 5) - 0.5) * 240,
        y: cy * 560 + (rnd(i, 2, 5) - 0.5) * 240,
        rot: (rnd(i, 3, 5) - 0.5) * 110,
        delay: rnd(i, 4, 5) * 0.4,
      });
    }
  }
  return pieces;
};
const PIECES = buildPieces();

const KnifePieceItem = ({ piece, progress, spread = 1 }) => {
  const { rot, delay, clip } = piece;
  const x = piece.x * spread;
  const y = piece.y * spread;
  const t = useTransform(progress, [delay, delay + 0.6], [0, 1], { clamp: true });
  const px = useTransform(t, [0, 1], [x, 0]);
  const py = useTransform(t, [0, 1], [y, 0]);
  const pr = useTransform(t, [0, 1], [rot, 0]);
  const ps = useTransform(t, [0, 1], [0.6, 1]);
  const po = useTransform(t, [0, 0.35, 1], [0, 1, 1]);
  return (
    <KnifePiece
      src={knifeImg}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      style={{ clipPath: clip, WebkitClipPath: clip, x: px, y: py, rotate: pr, scale: ps, opacity: po }}
    />
  );
};

const TECHS = [
  { name: 'React', icon: <FaReact /> },
  { name: 'JavaScript', icon: <FaJs /> },
  { name: 'Git', icon: <FaGitAlt /> },
  { name: 'Python', icon: <SiPython /> },
  {
    name: 'SQL / NoSQL',
    icon: (
      <IconGroup>
        <SiPostgresql />
        <SiMongodb />
      </IconGroup>
    )
  },
  { name: 'Bash', icon: <DiTerminal /> },
  { name: 'Java', icon: <DiJava /> },
  { name: 'AWS', icon: <SiAmazonwebservices /> },
  { name: 'Power BI', icon: <SiPowerbi /> },
  { name: 'OpenAI', icon: <SiOpenai /> },
  { name: 'Gemini', icon: <SiGooglegemini /> },
  { name: 'n8n', icon: <N8nIcon /> },
  { name: 'Linear', icon: <SiLinear /> },
  { name: 'Adobe Experience Manager', icon: <SiAdobe /> },
  { name: 'Workfront', icon: <FaProjectDiagram /> }
];

const KnifeBase = ({ progress }) => {
  // la imagen completa aparece justo al final y tapa cualquier costura
  const o = useTransform(progress, [0.92, 1], [0, 1], { clamp: true });
  return <KnifePiece src={knifeImg} alt="" aria-hidden="true" draggable={false} style={{ opacity: o }} />;
};

const TechDesktop = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);
  const knifeRef = useRef(null);
  const [isMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const knifeParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Ensamblado: empieza cuando la navaja asoma y termina cerca del centro
  const { scrollYProgress: assembleRaw } = useScroll({
    target: knifeRef,
    offset: ['start 92%', 'center 52%'],
  });
  const assemble = useSpring(assembleRaw, { stiffness: 90, damping: 22, mass: 0.5 });

  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rotateYValue, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateYValue.set(px * 20);
    rotateXValue.set(py * -20);
  };

  const handleMouseLeave = () => {
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  /* ---- Lista infinita ----
     - Avanza sola, despacito, y nunca termina (3 copias en bucle).
     - Se arrastra con click izquierdo (mouse) o con el dedo (scroll nativo).
     - También responde a la rueda / trackpad.
     - El ítem más cercano al centro queda "en foco" (--f). */
  const scrollerRef = useRef(null);
  const trackRef = useRef(null);
  const AUTO_SPEED = 28; // px por segundo
  const IDLE_MS = 1400; // pausa tras interactuar antes de retomar el avance solo

  useEffect(() => {
    if (reduced) return undefined;
    const sc = scrollerRef.current;
    const track = trackRef.current;
    if (!sc || !track) return undefined;

    const st = {
      pos: 0,
      setH: 0,
      box: 0,
      cardH: 0,
      tops: [],
      vel: 0, // px/ms (inercia tras soltar)
      dragging: false,
      touching: false,
      lastInteract: 0,
      lastSet: 0,
      visible: false,
      lastT: 0,
      lastY: 0,
      lastMoveT: 0,
    };

    const norm = (v) => {
      if (!st.setH) return v;
      let x = v;
      while (x >= st.setH * 2) x -= st.setH;
      while (x < st.setH) x += st.setH;
      return x;
    };

    const applyFocus = () => {
      const cards = track.children;
      const center = sc.scrollTop + st.box / 2;
      for (let i = 0; i < cards.length; i += 1) {
        const d = Math.abs(st.tops[i] + st.cardH / 2 - center);
        const f = Math.max(0, 1 - d / (st.cardH * 2.1));
        cards[i].style.setProperty('--f', (f * f * (3 - 2 * f)).toFixed(3));
      }
    };

    const write = () => {
      sc.scrollTop = st.pos;
      st.lastSet = sc.scrollTop;
      applyFocus();
    };

    const measure = () => {
      const cards = [...track.children];
      if (cards.length < 3) return;
      const n = cards.length / 3;
      st.box = sc.clientHeight;
      st.cardH = cards[0].offsetHeight + 16;
      st.tops = cards.map((c) => c.offsetTop);
      st.setH = cards[n].offsetTop - cards[0].offsetTop;
      st.pos = norm(st.pos || st.setH);
      write();
    };
    measure();

    /* --- mouse: arrastrar con click izquierdo --- */
    const onDown = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      st.dragging = true;
      st.vel = 0;
      st.lastY = e.clientY;
      st.lastMoveT = performance.now();
      st.lastInteract = st.lastMoveT;
      sc.classList.add('dragging');
      sc.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!st.dragging) return;
      const now = performance.now();
      const dy = st.lastY - e.clientY;
      const dt = Math.max(1, now - st.lastMoveT);
      st.pos = norm(st.pos + dy);
      st.vel = Math.max(-2, Math.min(2, st.vel * 0.6 + (dy / dt) * 0.4));
      st.lastY = e.clientY;
      st.lastMoveT = now;
      st.lastInteract = now;
      write();
    };
    const onUp = (e) => {
      if (!st.dragging) return;
      st.dragging = false;
      st.lastInteract = performance.now();
      // si quedó quieto antes de soltar, sin inercia
      if (performance.now() - st.lastMoveT > 80) st.vel = 0;
      sc.classList.remove('dragging');
      if (sc.hasPointerCapture(e.pointerId)) sc.releasePointerCapture(e.pointerId);
    };

    /* --- rueda / dedo (scroll nativo) --- */
    let settleTimer = 0;
    const onScroll = () => {
      if (st.dragging) return;
      if (Math.abs(sc.scrollTop - st.lastSet) > 1.5) {
        // movimiento externo (rueda, dedo): lo adoptamos
        st.pos = sc.scrollTop;
        st.vel = 0;
        st.lastInteract = performance.now();
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => {
          if (st.touching) return;
          const n = norm(sc.scrollTop);
          if (n !== sc.scrollTop) {
            st.pos = n;
            write();
          }
        }, 140);
      }
      applyFocus();
    };
    const onTouchStart = () => {
      st.touching = true;
      st.vel = 0;
      st.lastInteract = performance.now();
    };
    const onTouchEnd = () => {
      st.touching = false;
      st.lastInteract = performance.now();
    };

    /* --- bucle: inercia + avance automático --- */
    let raf = 0;
    const tick = (t) => {
      const dt = st.lastT ? Math.min(64, t - st.lastT) : 16;
      st.lastT = t;
      if (st.visible && !st.dragging && !st.touching) {
        if (Math.abs(st.vel) > 0.02) {
          st.pos = norm(st.pos + st.vel * dt);
          st.vel *= Math.pow(0.94, dt / 16);
          st.lastInteract = performance.now();
          write();
        } else if (performance.now() - st.lastInteract > IDLE_MS) {
          st.vel = 0;
          st.pos = norm(st.pos + (AUTO_SPEED * dt) / 1000);
          write();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(
      ([entry]) => {
        st.visible = entry.isIntersecting;
        st.lastT = 0;
      },
      { threshold: 0 }
    );
    io.observe(sc);

    sc.addEventListener('pointerdown', onDown);
    sc.addEventListener('pointermove', onMove);
    sc.addEventListener('pointerup', onUp);
    sc.addEventListener('pointercancel', onUp);
    sc.addEventListener('scroll', onScroll, { passive: true });
    sc.addEventListener('touchstart', onTouchStart, { passive: true });
    sc.addEventListener('touchend', onTouchEnd, { passive: true });
    sc.addEventListener('touchcancel', onTouchEnd, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settleTimer);
      io.disconnect();
      sc.removeEventListener('pointerdown', onDown);
      sc.removeEventListener('pointermove', onMove);
      sc.removeEventListener('pointerup', onUp);
      sc.removeEventListener('pointercancel', onUp);
      sc.removeEventListener('scroll', onScroll);
      sc.removeEventListener('touchstart', onTouchStart);
      sc.removeEventListener('touchend', onTouchEnd);
      sc.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('resize', measure);
    };
  }, [reduced]);

  return (
    <TechSection ref={sectionRef}>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {t('technologiesTitle')}
        </Title>

        <MainRow>
          <KnifeColumn
            ref={knifeRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <AmbientGlow />
            <ContactShadow />
            <TiltInner style={{ rotateX, rotateY, y: knifeParallax }}>
              {reduced ? (
                <KnifeStage role="img" aria-label="Navaja suiza — versatilidad técnica">
                  <KnifePiece src={knifeImg} alt="" aria-hidden="true" />
                </KnifeStage>
              ) : (
                <KnifeStage role="img" aria-label="Navaja suiza — versatilidad técnica">
                  <KnifeBase progress={assemble} />
                  {PIECES.map((piece, i) => (
                    <KnifePieceItem key={i} piece={piece} progress={assemble} spread={isMobile ? 0.45 : 1} />
                  ))}
                </KnifeStage>
              )}
            </TiltInner>
          </KnifeColumn>

          <CarouselColumn>
            <CarouselContainer $static={reduced}>
              <TechScroller ref={scrollerRef} $static={reduced}>
                <TechTrack ref={trackRef}>
                  {(reduced ? [0] : [0, 1, 2]).flatMap((copy) =>
                    TECHS.map((tech) => (
                      <TechCard key={`${copy}-${tech.name}`} $static={reduced} aria-hidden={copy > 0 ? 'true' : undefined}>
                        {tech.icon}
                        <h3>{tech.name}</h3>
                      </TechCard>
                    ))
                  )}
                </TechTrack>
              </TechScroller>
            </CarouselContainer>
          </CarouselColumn>
        </MainRow>
      </ContentWrapper>
    </TechSection>
  );
};

/* ------------------------------------------------------------------ */
/*  Móvil: escena fija. El scroll arma la navaja y luego recorre la lista */
/* ------------------------------------------------------------------ */

const MobileSection = styled.section`
  background-color: var(--surface-1);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 70px 0 0;
  overflow-x: clip;
  max-width: none;
  text-align: center;
`;

const MobileHead = styled.div`
  padding: 0 20px 10px;

  h2 {
    margin-bottom: 0;
  }
`;

const MobilePin = styled.div`
  position: relative;
`;

const MobileSticky = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  overflow: hidden;
`;

const MobileKnife = styled(motion.div)`
  position: relative;
  width: min(52vw, 210px);
  flex-shrink: 0;
`;

const MobileGlow = styled(motion.div)`
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle, rgba(159, 180, 255, 0.16) 0%, transparent 62%);
  pointer-events: none;
`;

const MobileListBox = styled.div`
  position: relative;
  width: min(86vw, 380px);
  height: min(34svh, 270px);
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 22%, #000 78%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, #000 22%, #000 78%, transparent 100%);
`;

const MobileTrack = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 12px;
  box-sizing: border-box;
  will-change: transform;
`;

const MobileTechScene = () => {
  const pinRef = useRef(null);
  const boxRef = useRef(null);
  const trackRef = useRef(null);
  const metrics = useRef({ tops: [], h: 0, box: 0, first: 0, last: 0 });
  const trackY = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: pinRef, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const assemble = useTransform(p, [0.02, 0.36], [0, 1], { clamp: true });
  const listP = useTransform(p, [0.34, 0.97], [0, 1], { clamp: true });
  const knifeScale = useTransform(p, [0, 0.36, 1], [0.92, 1, 0.9]);
  const glowOpacity = useTransform(assemble, [0.6, 1], [0, 1]);

  const applyFocus = (y) => {
    const m = metrics.current;
    const track = trackRef.current;
    if (!track || !m.box) return;
    const center = m.box / 2;
    const cards = track.children;
    for (let i = 0; i < cards.length; i += 1) {
      const d = Math.abs(m.tops[i] + m.h / 2 + y - center);
      const f = Math.max(0, 1 - d / (m.h * 1.9));
      cards[i].style.setProperty('--f', (f * f * (3 - 2 * f)).toFixed(3));
    }
  };

  const update = (v) => {
    const m = metrics.current;
    if (!m.box) return;
    const y = m.first + (m.last - m.first) * v;
    trackY.set(y);
    applyFocus(y);
  };
  useMotionValueEvent(listP, 'change', update);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const box = boxRef.current;
      if (!track || !box) return;
      const cards = [...track.children];
      const m = metrics.current;
      m.box = box.clientHeight;
      m.h = cards[0].offsetHeight + 16;
      m.tops = cards.map((c) => c.offsetTop);
      const center = m.box / 2;
      m.first = center - (m.tops[0] + cards[0].offsetHeight / 2);
      m.last = center - (m.tops[cards.length - 1] + cards[cards.length - 1].offsetHeight / 2);
      update(listP.get());
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MobilePin ref={pinRef} style={{ height: '420svh' }}>
        <MobileSticky>
          <MobileKnife style={{ scale: knifeScale }}>
            <MobileGlow style={{ opacity: glowOpacity }} />
            <KnifeStage role="img" aria-label="Navaja suiza — versatilidad técnica">
              <KnifeBase progress={assemble} />
              {PIECES.map((piece, i) => (
                <KnifePieceItem key={i} piece={piece} progress={assemble} spread={0.5} />
              ))}
            </KnifeStage>
          </MobileKnife>
          <MobileListBox ref={boxRef}>
            <MobileTrack ref={trackRef} style={{ y: trackY }}>
              {TECHS.map((tech) => (
                <TechCard key={tech.name}>
                  {tech.icon}
                  <h3>{tech.name}</h3>
                </TechCard>
              ))}
            </MobileTrack>
          </MobileListBox>
        </MobileSticky>
      </MobilePin>
    </>
  );
};

const Technologies = () => {
  const reduced = useReducedMotion();
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const on = () => setMobile(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const { t } = useTranslation();

  if (!mobile || reduced) return <TechDesktop />;

  return (
    <MobileSection>
      <MobileHead>
        <Title
          initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {t('technologiesTitle')}
        </Title>
      </MobileHead>
      <MobileTechScene />
    </MobileSection>
  );
};

export default Technologies;
