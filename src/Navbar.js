import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getLenisInstance } from './lenisInstance';

const NAV_IDS = ['home', 'about', 'services', 'technologies', 'experience', 'projects', 'contact'];
const NAV_KEYS = {
  home: 'navHome',
  about: 'navAbout',
  services: 'navServices',
  technologies: 'navTech',
  experience: 'navExperience',
  projects: 'navProjects',
  contact: 'navContact',
};

const isDesktop = () => window.matchMedia('(min-width: 901px)').matches;

/* Posición absoluta (en px de scroll) de cada sección. "about" en escritorio
   vive dentro del héroe fijo, así que se calcula a partir de su reveal. */
const topOf = (id) => {
  if (id === 'home') return 0;
  if (id === 'about' && isDesktop()) return 640;
  const el = document.getElementById(id);
  if (!el) return null;
  return el.getBoundingClientRect().top + window.scrollY;
};

const scrollToId = (id, onDone) => {
  const y = topOf(id);
  if (y == null) return;
  const lenis = getLenisInstance();
  const target = id === 'home' || id === 'about' ? y : y - 8;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4), onComplete: onDone });
  } else {
    window.scrollTo({ top: target, behavior: 'smooth' });
    if (onDone) setTimeout(onDone, 700);
  }
};

const useActiveSection = () => {
  const [active, setActive] = useState('home');
  const lock = useRef(null);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      if (lock.current) return;
      const probe = window.scrollY + window.innerHeight * 0.38;
      let current = 'home';
      NAV_IDS.forEach((id) => {
        const y = topOf(id);
        if (y != null && y <= probe) current = id;
      });
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = 'contact';
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const late = setTimeout(compute, 1200); // layout tardío (imágenes, fuentes)
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(late);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = useCallback((id, after) => {
    setActive(id);
    lock.current = id; // no pisar el resaltado mientras viaja el scroll
    scrollToId(id, () => {
      lock.current = null;
      if (after) after();
    });
    setTimeout(() => {
      lock.current = null;
    }, 2200);
  }, []);

  return [active, go];
};

/* ----------------------------- Escritorio ----------------------------- */

const Bar = styled(motion.nav)`
  position: fixed;
  top: 18px;
  left: 50%;
  translate: -50% 0;
  z-index: 300;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 5px;
  border-radius: 999px;
  background: rgba(14, 14, 18, 0.62);
  border: 1px solid var(--line-strong);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.05);

  @media (max-width: 900px) {
    display: none;
  }
`;

const Item = styled.button`
  position: relative;
  border: 0;
  background: transparent;
  color: ${({ $on }) => ($on ? 'var(--text-hi)' : 'var(--text-2)')};
  font: inherit;
  font-size: 0.86rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  padding: 9px 15px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.25s ease;

  &:hover {
    color: var(--text-hi);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const Pill = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 38%, transparent);
  box-shadow: 0 0 18px -4px var(--accent-glow);
`;

/* ------------------------------- Móvil -------------------------------- */

const MenuBtn = styled(motion.button)`
  display: none;
  position: fixed;
  top: 14px;
  left: 14px;
  z-index: 320;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line-strong);
  background: rgba(14, 14, 18, 0.66);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 8px 26px -8px rgba(0, 0, 0, 0.7);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const Burger = styled.span`
  position: relative;
  width: 18px;
  height: 12px;
  display: block;

  i {
    position: absolute;
    left: 0;
    height: 2px;
    border-radius: 2px;
    background: var(--text-hi);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, width 0.3s ease, top 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  i:nth-child(1) {
    top: ${({ $open }) => ($open ? '5px' : '0')};
    width: 18px;
    transform: ${({ $open }) => ($open ? 'rotate(45deg)' : 'none')};
  }
  i:nth-child(2) {
    top: 5px;
    width: 12px;
    opacity: ${({ $open }) => ($open ? 0 : 1)};
  }
  i:nth-child(3) {
    top: ${({ $open }) => ($open ? '5px' : '10px')};
    width: ${({ $open }) => ($open ? '18px' : '15px')};
    transform: ${({ $open }) => ($open ? 'rotate(-45deg)' : 'none')};
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 310;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 90px 28px 40px;
  overflow-y: auto;
  isolation: isolate;
  background:
    radial-gradient(90% 55% at 0% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 62%),
    radial-gradient(80% 50% at 100% 100%, color-mix(in srgb, var(--accent) 9%, transparent), transparent 65%),
    linear-gradient(180deg, #0b0b0e 0%, #08080a 55%, #060608 100%);

  /* Retícula técnica muy tenue que se desvanece hacia los bordes */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image:
      linear-gradient(var(--line) 1px, transparent 1px),
      linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 44px 44px;
    -webkit-mask-image: radial-gradient(ellipse at 50% 45%, #000 15%, transparent 72%);
    mask-image: radial-gradient(ellipse at 50% 45%, #000 15%, transparent 72%);
    opacity: 0.55;
  }

  /* Grano fino para quitar el aspecto plano del degradé */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    opacity: 0.07;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  }
`;

const MenuFoot = styled(motion.div)`
  width: 100%;
  max-width: 420px;
  margin: 28px auto 0;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-3);
  font-size: 0.8rem;
  letter-spacing: 0.04em;
`;

const MobileList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
`;

const MobileLink = styled(motion.button)`
  width: 100%;
  display: flex;
  align-items: baseline;
  gap: 16px;
  text-align: left;
  border: 0;
  border-bottom: 1px solid var(--line);
  background: transparent;
  padding: 14px 2px;
  font: inherit;
  font-size: clamp(1.7rem, 8vw, 2.3rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: ${({ $on }) => ($on ? 'var(--accent)' : 'var(--text-hi)')};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  position: relative;

  &::after {
    content: '';
    margin-left: auto;
    align-self: center;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 12px var(--accent-glow);
    opacity: ${({ $on }) => ($on ? 1 : 0)};
    transform: scale(${({ $on }) => ($on ? 1 : 0.4)});
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  small {
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: var(--text-3);
    min-width: 22px;
  }
`;

const LangBtn = styled.button`
  padding: 9px 20px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
`;

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const reduced = useReducedMotion();
  const [active, go] = useActiveSection();
  const [open, setOpen] = useState(false);

  // Bloquea el scroll de fondo mientras el menú móvil está abierto
  useEffect(() => {
    const lenis = getLenisInstance();
    if (open) {
      if (lenis) lenis.stop();
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const onKey = (e) => e.key === 'Escape' && setOpen(false);
      window.addEventListener('keydown', onKey);
      return () => {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = prev;
        if (lenis) lenis.start();
      };
    }
    return undefined;
  }, [open]);

  // Si se pasa a escritorio con el menú abierto, ciérralo
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const on = () => mq.matches && setOpen(false);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const mobileGo = (id) => {
    setOpen(false);
    // espera a que el menú suelte el bloqueo de scroll antes de viajar
    setTimeout(() => go(id), 60);
  };

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');

  return (
    <>
      <Bar
        aria-label={t('navLabel')}
        initial={reduced ? false : { opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {NAV_IDS.map((id) => (
          <Item key={id} $on={active === id} onClick={() => go(id)} aria-current={active === id ? 'true' : undefined}>
            {active === id && (
              <Pill layoutId="nav-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
            )}
            <span>{t(NAV_KEYS[id])}</span>
          </Item>
        ))}
      </Bar>

      <MenuBtn
        aria-label={open ? t('navClose') : t('navOpen')}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        initial={reduced ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileTap={{ scale: 0.92 }}
      >
        <Burger $open={open}>
          <i />
          <i />
          <i />
        </Burger>
      </MenuBtn>

      <AnimatePresence>
        {open && (
          <Overlay
            role="dialog"
            aria-modal="true"
            aria-label={t('navLabel')}
            initial={{ opacity: 0, clipPath: 'circle(0% at 40px 37px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 40px 37px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 40px 37px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <MobileList>
              {NAV_IDS.map((id, i) => (
                <li key={id}>
                  <MobileLink
                    $on={active === id}
                    onClick={() => mobileGo(id)}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.18 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <small>{String(i + 1).padStart(2, '0')}</small>
                    {t(NAV_KEYS[id])}
                  </MobileLink>
                </li>
              ))}
            </MobileList>
            <MenuFoot
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.5 }}
            >
              <span>sebastiandiko.info</span>
              <LangBtn onClick={toggleLang}>{i18n.language === 'es' ? 'English' : 'Español'}</LangBtn>
            </MenuFoot>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
