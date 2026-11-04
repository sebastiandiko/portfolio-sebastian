import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { animate, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaProjectDiagram, FaRobot, FaBrain, FaPlug, FaTasks, FaArrowRight } from 'react-icons/fa';
import shineHover from './shineEffect';
import { getLenisInstance } from './lenisInstance';
import { serviceVisuals, CtaVisual } from './ServiceVisuals';

const icons = [FaProjectDiagram, FaRobot, FaBrain, FaPlug, FaTasks];

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */

const Section = styled.section`
  background-color: var(--bg);
  padding: 120px 0 0;
  max-width: none;
  overflow: visible;
`;

const Intro = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
  ${shineHover('linear-gradient(180deg, var(--text-hi) 0%, var(--text-hi) 200%)')}
`;

const Subtitle = styled(motion.p)`
  max-width: 680px;
  text-align: center;
  font-size: clamp(1rem, 2.2vw, 1.2rem);
`;

const Stage = styled.div`
  --cw: clamp(290px, 31vw, 430px);
  position: relative;

  @media (max-width: 620px) {
    --cw: min(80vw, 340px);
  }
  width: 100%;
  padding-bottom: 120px;
  perspective: 1400px;
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%);
`;

/* Scroller horizontal: se arrastra con el mouse presionado o con el dedo */
const Scroller = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  padding: 30px 0 40px;
  scrollbar-width: none;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-x pan-y;

  &::-webkit-scrollbar {
    display: none;
  }
  &.dragging {
    cursor: grabbing;
  }
  @media (pointer: coarse) {
    scroll-snap-type: x proximity;
  }
`;

const Track = styled.div`
  display: flex;
  align-items: stretch;
  gap: clamp(16px, 2.4vw, 32px);
  width: max-content;
  ${(p) => p.$pad && 'padding-inline: calc(50vw - var(--cw) / 2);'}
`;

/* ------------------------------------------------------------------ */
/*  Tarjetas                                                           */
/* ------------------------------------------------------------------ */

const cardSize = `
  width: var(--cw);
  height: clamp(460px, 64vh, 560px);
  @media (max-width: 620px) {
    height: min(66vh, 460px);
  }
  flex-shrink: 0;
`;

const Card = styled.article`
  ${cardSize}
  --f: 0;
  position: relative;
  padding: 14px;
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  background:
    radial-gradient(520px circle at 85% 0%, rgba(159, 180, 255, calc(0.04 + var(--f) * 0.16)), transparent 60%),
    linear-gradient(165deg, var(--surface-2) 0%, var(--surface-1) 70%);
  border: 1px solid color-mix(in srgb, var(--accent) calc(var(--f) * 38%), rgba(232, 234, 255, 0.09));
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.8), 0 0 calc(var(--f) * 60px) rgba(159, 180, 255, calc(var(--f) * 0.14));
  scroll-snap-align: center;
  --o: 0;
  opacity: calc(0.4 + var(--f) * 0.6);
  @media (max-width: 620px) {
    opacity: calc(0.62 + var(--f) * 0.38);
  }
  transform: translateY(calc((1 - var(--f)) * 26px)) scale(calc(0.88 + var(--f) * 0.12)) rotateY(calc(var(--o) * -26deg));
  will-change: transform, opacity;

  &::before {
    /* brillo que recorre el borde superior cuando está en foco */
    content: '';
    position: absolute;
    top: 0;
    left: 12%;
    right: 12%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: var(--f);
  }
`;

/* Panel con la ilustración animada: ocupa el espacio superior de la tarjeta */
const VisualPanel = styled.div`
  position: relative;
  flex: 1;
  min-height: 130px;
  border-radius: 20px;
  padding: 14px 10px 6px;
  overflow: hidden;
  border: 1px solid var(--line);
  background:
    radial-gradient(260px circle at 50% 55%, rgba(159, 180, 255, calc(0.06 + var(--f) * 0.12)), transparent 70%),
    linear-gradient(rgba(232, 234, 255, 0.035) 1px, transparent 1px) 0 0 / 100% 22px,
    linear-gradient(90deg, rgba(232, 234, 255, 0.035) 1px, transparent 1px) 0 0 / 22px 100%,
    rgba(8, 8, 10, 0.55);

  > svg {
    opacity: calc(0.62 + var(--f) * 0.38);
  }
`;

const IconBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 1rem;
  z-index: 2;
  color: color-mix(in srgb, var(--accent) calc(50% + var(--f) * 50%), var(--text-2));
  background: rgba(8, 8, 10, 0.7);
  border: 1px solid color-mix(in srgb, var(--accent) calc(var(--f) * 50%), rgba(232, 234, 255, 0.14));
  box-shadow: 0 0 calc(var(--f) * 22px) rgba(159, 180, 255, calc(var(--f) * 0.3));
`;

const Body = styled.div`
  padding: 20px 12px 10px;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 16px;
`;

const Chip = styled.span`
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  padding: 5px 11px;
  border-radius: 999px;
  color: color-mix(in srgb, var(--accent) calc(var(--f) * 100%), var(--text-2));
  border: 1px solid color-mix(in srgb, var(--accent) calc(var(--f) * 40%), rgba(232, 234, 255, 0.14));
  background: rgba(159, 180, 255, calc(0.03 + var(--f) * 0.07));
`;

const CardTitle = styled.h3`
  font-size: clamp(1.45rem, 2.4vw, 1.9rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0 0 12px;
  color: var(--text-hi);
`;

const CardText = styled.p`
  font-size: clamp(0.95rem, 1.2vw, 1.02rem);
  line-height: 1.65;
  color: var(--text-2);
`;

const CtaCard = styled(Card)`
  align-items: stretch;
  background:
    radial-gradient(640px circle at 20% 100%, rgba(159, 180, 255, calc(0.08 + var(--f) * 0.2)), transparent 65%),
    linear-gradient(165deg, var(--surface-2) 0%, var(--surface-1) 75%);
`;

const CtaButton = styled.button`
  margin-top: 22px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 15px 28px;
  border-radius: 999px;
  border: 0;
  background: var(--text-hi);
  color: var(--bg);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;

  svg {
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    box-shadow: 0 0 34px var(--accent-glow);
  }
  &:hover svg {
    transform: translateX(5px);
  }
`;

/* ------------------------------------------------------------------ */
/*  Componentes                                                        */
/* ------------------------------------------------------------------ */

const ease = [0.16, 1, 0.3, 1];
const reveal = {
  initial: { opacity: 0, y: 40, filter: 'blur(12px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1, ease },
};


const ServiceBody = ({ item, index }) => {
  const Icon = icons[index % icons.length];
  const Visual = serviceVisuals[index % serviceVisuals.length];
  return (
    <>
      <VisualPanel>
        <IconBadge><Icon /></IconBadge>
        <Visual />
      </VisualPanel>
      <Body>
        <CardTitle>{item.title}</CardTitle>
        <CardText>{item.description}</CardText>
        {Array.isArray(item.tags) && (
          <Chips>
            {item.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </Chips>
        )}
      </Body>
    </>
  );
};

const CtaBody = ({ t, goContact, tabIndex }) => (
  <>
    <VisualPanel>
      <CtaVisual />
    </VisualPanel>
    <Body>
      <CardTitle>{t('servicesCtaTitle')}</CardTitle>
      <CardText>{t('servicesCtaText')}</CardText>
      <CtaButton data-magnetic tabIndex={tabIndex} onClick={goContact}>
        {t('servicesCta')} <FaArrowRight />
      </CtaButton>
    </Body>
  </>
);

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (v) => v * v * (3 - 2 * v);

const ServicesDesktop = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const items = t('services', { returnObjects: true });
  const list = Array.isArray(items) ? items : [];
  const total = list.length;

  const scrollerRef = useRef(null);
  const trackRef = useRef(null);
  const AUTO_SPEED = 32; // px por segundo
  const IDLE_MS = 1400; // pausa tras interactuar antes de retomar el avance solo
  const COPIES = reduced ? 1 : 3;

  useEffect(() => {
    const sc = scrollerRef.current;
    const track = trackRef.current;
    if (!sc || !track) return undefined;

    const st = {
      pos: 0,
      base: 0, // scrollLeft con la 1ª tarjeta de la copia central centrada
      setW: 0,
      dragging: false,
      moved: false,
      touching: false,
      gliding: false,
      startX: 0,
      lastX: 0,
      lastT: 0,
      vel: 0,
      lastInteract: 0,
      lastSet: 0,
      visible: false,
      frameT: 0,
      anim: null,
    };

    const norm = (v) => {
      if (reduced || !st.setW) return v;
      let x = v;
      while (x >= st.base + st.setW) x -= st.setW;
      while (x < st.base) x += st.setW;
      return x;
    };

    const applyFocus = () => {
      const vw = sc.clientWidth;
      const center = sc.scrollLeft + vw / 2;
      const cards = track.children;
      const pitch = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : vw;
      const range = Math.max(vw * 0.46, pitch * 1.15); // en pantallas angostas, el foco abarca al menos una tarjeta
      for (let i = 0; i < cards.length; i += 1) {
        const c = cards[i];
        const d = c.offsetLeft + c.offsetWidth / 2 - center;
        const f = reduced ? 0.7 : smooth(clamp01(1 - Math.abs(d) / range));
        c.style.setProperty('--f', f.toFixed(3));
        if (!reduced) c.style.setProperty('--o', Math.max(-1, Math.min(1, d / vw)).toFixed(3));
      }
    };

    const write = () => {
      sc.scrollLeft = st.pos;
      st.lastSet = sc.scrollLeft;
      applyFocus();
    };

    const measure = () => {
      const cards = [...track.children];
      if (!reduced && cards.length >= 3) {
        const n = cards.length / 3;
        const vw = sc.clientWidth;
        st.setW = cards[n].offsetLeft - cards[0].offsetLeft;
        st.base = cards[n].offsetLeft + cards[n].offsetWidth / 2 - vw / 2;
        st.pos = st.pos ? norm(st.pos) : st.base;
      }
      write();
    };
    measure();

    const nearestCenter = (from) => {
      const vw = sc.clientWidth;
      let best = from;
      let bestD = Infinity;
      [...track.children].forEach((c) => {
        const target = c.offsetLeft + c.offsetWidth / 2 - vw / 2;
        const d = Math.abs(target - from);
        if (d < bestD) {
          bestD = d;
          best = target;
        }
      });
      return best;
    };

    const glideTo = (to) => {
      if (st.anim) st.anim.stop();
      st.gliding = true;
      const from = sc.scrollLeft;
      st.anim = animate(from, to, {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => {
          st.pos = v;
          write();
        },
        onComplete: () => {
          st.gliding = false;
          st.pos = norm(st.pos);
          st.lastInteract = performance.now();
          write();
        },
      });
    };

    /* --- mouse: arrastrar con click izquierdo --- */
    const onDown = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      if (st.anim) st.anim.stop();
      st.gliding = false;
      st.dragging = true;
      st.moved = false;
      st.startX = e.clientX;
      st.lastX = e.clientX;
      st.lastT = performance.now();
      st.vel = 0;
      st.lastInteract = st.lastT;
    };
    const onMove = (e) => {
      if (!st.dragging) return;
      if (!st.moved && Math.abs(e.clientX - st.startX) > 5) {
        st.moved = true;
        sc.classList.add('dragging');
        sc.setPointerCapture(e.pointerId); // recién al arrastrar, así los clicks simples siguen andando
      }
      if (!st.moved) return;
      const now = performance.now();
      const dt = Math.max(1, now - st.lastT);
      const dx = st.lastX - e.clientX;
      st.vel = Math.max(-3, Math.min(3, st.vel * 0.6 + (dx / dt) * 0.4));
      st.lastX = e.clientX;
      st.lastT = now;
      st.lastInteract = now;
      st.pos = norm(st.pos + dx);
      write();
    };
    const onUp = (e) => {
      if (!st.dragging) return;
      st.dragging = false;
      sc.classList.remove('dragging');
      if (sc.hasPointerCapture(e.pointerId)) sc.releasePointerCapture(e.pointerId);
      st.lastInteract = performance.now();
      if (!st.moved) return;
      const stale = performance.now() - st.lastT > 80;
      glideTo(nearestCenter(sc.scrollLeft + (stale ? 0 : st.vel * 260)));
    };
    // un arrastre no debe disparar el click del botón
    const onClickCapture = (e) => {
      if (st.moved) {
        e.stopPropagation();
        e.preventDefault();
        st.moved = false;
      }
    };

    /* --- dedo / trackpad (scroll nativo) --- */
    let settleTimer = 0;
    const onScroll = () => {
      if (st.dragging || st.gliding) return;
      if (Math.abs(sc.scrollLeft - st.lastSet) > 1.5) {
        st.pos = sc.scrollLeft;
        st.lastInteract = performance.now();
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => {
          if (st.touching) return;
          const n = norm(sc.scrollLeft);
          if (n !== sc.scrollLeft) {
            st.pos = n;
            write();
          }
        }, 140);
      }
      applyFocus();
    };
    const onTouchStart = () => {
      st.touching = true;
      st.lastInteract = performance.now();
    };
    const onTouchEnd = () => {
      st.touching = false;
      st.lastInteract = performance.now();
    };

    /* --- avance automático --- */
    let raf = 0;
    const tick = (t) => {
      const dt = st.frameT ? Math.min(64, t - st.frameT) : 16;
      st.frameT = t;
      if (!reduced && st.visible && !st.dragging && !st.touching && !st.gliding) {
        if (performance.now() - st.lastInteract > IDLE_MS) {
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
        st.frameT = 0;
      },
      { threshold: 0 }
    );
    io.observe(sc);

    sc.addEventListener('pointerdown', onDown);
    sc.addEventListener('pointermove', onMove);
    sc.addEventListener('pointerup', onUp);
    sc.addEventListener('pointercancel', onUp);
    sc.addEventListener('click', onClickCapture, true);
    sc.addEventListener('scroll', onScroll, { passive: true });
    sc.addEventListener('touchstart', onTouchStart, { passive: true });
    sc.addEventListener('touchend', onTouchEnd, { passive: true });
    sc.addEventListener('touchcancel', onTouchEnd, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settleTimer);
      io.disconnect();
      if (st.anim) st.anim.stop();
      sc.removeEventListener('pointerdown', onDown);
      sc.removeEventListener('pointermove', onMove);
      sc.removeEventListener('pointerup', onUp);
      sc.removeEventListener('pointercancel', onUp);
      sc.removeEventListener('click', onClickCapture, true);
      sc.removeEventListener('scroll', onScroll);
      sc.removeEventListener('touchstart', onTouchStart);
      sc.removeEventListener('touchend', onTouchEnd);
      sc.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('resize', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, total]);

  const goContact = () => {
    const el = document.getElementById('contact');
    const lenis = getLenisInstance();
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -20 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="services">
      <Intro>
        <Title {...reveal}>{t('servicesTitle')}</Title>
        <Subtitle {...reveal}>{t('servicesSubtitle')}</Subtitle>
      </Intro>

      <Stage>
        <Scroller ref={scrollerRef}>
          <Track ref={trackRef} $pad={reduced}>
            {Array.from({ length: COPIES }).flatMap((_, copy) => {
              const hidden = copy > 0 ? { 'aria-hidden': 'true' } : {};
              return [
                ...list.map((item, i) => (
                  <Card key={`${copy}-${item.title}`} {...hidden}>
                    <ServiceBody item={item} index={i} />
                  </Card>
                )),
                /* Panel de llamada a la acción dentro del bucle */
                <CtaCard key={`${copy}-cta`} {...hidden}>
                  <CtaBody t={t} goContact={goContact} tabIndex={copy > 0 ? -1 : undefined} />
                </CtaCard>,
              ];
            })}
          </Track>
        </Scroller>
      </Stage>
    </Section>
  );
};

/* ------------------------------------------------------------------ */
/*  Móvil: pila de tarjetas fija. Cada gesto de scroll trae la próxima  */
/*  tarjeta desde abajo y hunde las anteriores en profundidad.          */
/* ------------------------------------------------------------------ */

const StackSticky = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  display: grid;
  place-items: center;
  overflow: hidden;
  perspective: 1100px;
`;

const StackStage = styled.div`
  position: relative;
  width: min(86vw, 360px);
  height: min(64svh, 480px);
`;

const StackItem = styled(motion.div)`
  position: absolute;
  inset: 0;
  will-change: transform, opacity;
  transform-origin: 50% 100%;
`;

const StackCard = styled(Card)`
  width: 100%;
  height: 100%;
  opacity: 1;
  transform: none;
`;

const StackCta = styled(CtaCard)`
  width: 100%;
  height: 100%;
  opacity: 1;
  transform: none;
`;

const StackProgress = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 5;
`;

const StackDot = styled(motion.span)`
  width: 4px;
  height: 18px;
  border-radius: 4px;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent-glow);
`;

const StackLayer = ({ index, q, count, children }) => {
  const rel = useTransform(q, (v) => index - v); // >0: aún no llegó, <0: ya pasó
  const y = useTransform(rel, (r) => {
    if (r > 0) return Math.min(r, 1.2) * (typeof window !== 'undefined' ? window.innerHeight : 800) * 0.95;
    return Math.max(r, -3) * 16;
  });
  const scale = useTransform(rel, (r) => (r > 0 ? 1 : 1 + Math.max(r, -3) * 0.06));
  const rotateX = useTransform(rel, (r) => (r > 0 ? Math.min(r, 1) * 16 : 0));
  const opacity = useTransform(rel, (r) => (r > 1.25 ? 0 : r < -2.6 ? 0 : 1));
  const filter = useTransform(rel, (r) => `brightness(${r < 0 ? Math.max(0.35, 1 + Math.max(r, -3) * 0.22) : 1})`);
  return (
    <StackItem style={{ y, scale, rotateX, opacity, filter, zIndex: index }} aria-hidden={index >= count ? 'true' : undefined}>
      {children}
    </StackItem>
  );
};

const StackDotItem = ({ index, q }) => {
  const o = useTransform(q, (v) => Math.max(0.18, 1 - Math.abs(v - index)));
  return <StackDot style={{ opacity: o }} />;
};

const ServicesMobile = () => {
  const { t } = useTranslation();
  const items = t('services', { returnObjects: true });
  const list = Array.isArray(items) ? items : [];
  const count = list.length + 1; // + tarjeta final
  const pinRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: pinRef, offset: ['start start', 'end end'] });
  const eased = useTransform(scrollYProgress, [0.03, 0.96], [0, 1], { clamp: true });
  const p = useSpring(eased, { stiffness: 130, damping: 26, mass: 0.4 });
  const q = useTransform(p, (v) => v * (count - 1));

  const goContact = () => {
    const el = document.getElementById('contact');
    const lenis = getLenisInstance();
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -20 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="services">
      <Intro>
        <Title {...reveal}>{t('servicesTitle')}</Title>
        <Subtitle {...reveal}>{t('servicesSubtitle')}</Subtitle>
      </Intro>

      <div ref={pinRef} style={{ height: `calc(${(count - 1) * 78}svh + 100svh)` }}>
        <StackSticky>
          <StackProgress aria-hidden="true">
            {Array.from({ length: count }).map((_, i) => (
              <StackDotItem key={i} index={i} q={q} />
            ))}
          </StackProgress>
          <StackStage>
            {list.map((item, i) => (
              <StackLayer key={item.title} index={i} q={q} count={count}>
                <StackCard style={{ '--f': 1 }}>
                  <ServiceBody item={item} index={i} />
                </StackCard>
              </StackLayer>
            ))}
            <StackLayer index={list.length} q={q} count={count}>
              <StackCta style={{ '--f': 1 }}>
                <CtaBody t={t} goContact={goContact} />
              </StackCta>
            </StackLayer>
          </StackStage>
        </StackSticky>
      </div>
    </Section>
  );
};

const Services = () => {
  const reduced = useReducedMotion();
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const on = () => setMobile(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return mobile && !reduced ? <ServicesMobile /> : <ServicesDesktop />;
};

export default Services;
