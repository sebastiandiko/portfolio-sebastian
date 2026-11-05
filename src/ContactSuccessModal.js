import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaLinkedin, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getLenisInstance } from './lenisInstance';

const ease = [0.22, 1, 0.36, 1];

const dialogVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease, when: 'beforeChildren', staggerChildren: 0.09, delayChildren: 0.12 },
  },
  exit: { opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.25, ease: 'easeIn' } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 10001;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(6, 6, 8, 0.72);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
`;

const Dialog = styled(motion.div)`
  position: relative;
  width: min(92vw, 460px);
  padding: 44px 32px 30px;
  border-radius: 28px;
  text-align: center;
  outline: none;
  will-change: transform, opacity;
  background:
    radial-gradient(420px circle at 50% 0%, rgba(111, 227, 193, 0.16), transparent 65%),
    linear-gradient(165deg, var(--surface-2) 0%, var(--surface-1) 75%);
  border: 1px solid var(--line-strong);
  box-shadow: 0 40px 90px -20px rgba(0, 0, 0, 0.9), 0 0 60px rgba(111, 227, 193, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 14%;
    right: 14%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }

  @media (max-width: 480px) {
    padding: 38px 22px 24px;
    border-radius: 24px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 0.9rem;
  color: var(--text-2);
  background: rgba(232, 234, 255, 0.05);
  border: 1px solid var(--line);
  cursor: pointer;
  transition: color 0.25s ease, background 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    color: var(--text-hi);
    background: rgba(232, 234, 255, 0.1);
    transform: rotate(90deg);
  }
`;

const Badge = styled(motion.div)`
  position: relative;
  width: 84px;
  height: 84px;
  margin: 0 auto 34px;
  display: grid;
  place-items: center;

  svg {
    overflow: visible;
  }
`;

const Ring = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid var(--accent);
  pointer-events: none;
`;

const Core = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--accent);
  background: rgba(111, 227, 193, 0.1);
  border: 1px solid color-mix(in srgb, var(--accent) 55%, transparent);
  box-shadow: 0 0 36px var(--accent-glow);
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.55rem, 5vw, 1.95rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--text-hi);
  margin-bottom: 12px;
  text-wrap: balance;
`;

const Text = styled(motion.p)`
  font-size: 1.02rem;
  line-height: 1.6;
  color: var(--text-2);
`;

const Divider = styled(motion.div)`
  height: 1px;
  margin: 26px 0 22px;
  background: linear-gradient(90deg, transparent, var(--line-strong), transparent);
`;

const FollowText = styled(motion.p)`
  font-size: 0.92rem;
  color: var(--text-3);
  margin-bottom: 16px;
`;

const LinkedInButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 26px;
  border-radius: 999px;
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--bg);
  background: var(--text-hi);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;

  svg {
    font-size: 1.35rem;
    color: #0a66c2; /* azul oficial de LinkedIn, el único color de marca de todo el sitio */
  }

  &:hover {
    color: var(--bg);
    transform: translateY(-2px);
    box-shadow: 0 10px 34px var(--accent-glow);
  }
`;

const CloseLink = styled(motion.button)`
  display: block;
  margin: 16px auto 0;
  padding: 8px 14px;
  font-size: 0.88rem;
  color: var(--text-3);
  background: none;
  border: 0;
  cursor: pointer;
  transition: color 0.25s ease;

  &:hover {
    color: var(--text-hi);
  }
`;

const FOCUSABLE = 'a[href], button:not([disabled])';

const ContactSuccessModal = ({ open, onClose, linkedinUrl }) => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    const lenis = getLenisInstance();
    if (lenis) lenis.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (lenis) lenis.start();
      if (previous && previous.focus) previous.focus();
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <Overlay
          key="thanks"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <Dialog
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="thanks-title"
            tabIndex={-1}
            variants={dialogVariants}
            initial={reduced ? false : 'hidden'}
            animate="show"
            exit="exit"
          >
            <CloseButton type="button" onClick={onClose} aria-label={t('contactPopupClose')}>
              <FaTimes />
            </CloseButton>

            <Badge aria-hidden="true" variants={itemVariants}>
              {!reduced && (
                <Ring
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 1.1, repeatDelay: 0.6 }}
                />
              )}
              <Core>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <motion.path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduced ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.5, ease }}
                  />
                </svg>
              </Core>
            </Badge>

            <Title id="thanks-title" variants={itemVariants}>{t('contactPopupTitle')}</Title>
            <Text variants={itemVariants}>{t('contactPopupText')}</Text>

            <Divider variants={itemVariants} />

            <FollowText variants={itemVariants}>{t('contactPopupFollow')}</FollowText>
            <LinkedInButton variants={itemVariants} href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
              {t('contactPopupLinkedin')}
            </LinkedInButton>

            <CloseLink type="button" variants={itemVariants} onClick={onClose}>
              {t('contactPopupClose')}
            </CloseLink>
          </Dialog>
        </Overlay>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ContactSuccessModal;
