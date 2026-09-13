import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import pulseGlow from './pulseEffect';
import { getLenisInstance } from './lenisInstance';

const Button = styled(motion.button)`
  position: fixed;
  right: 28px;
  bottom: 28px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #ffffff;
  color: #000000;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  cursor: pointer;
  z-index: 200;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  ${pulseGlow}

  &:hover {
    animation-play-state: paused;
  }

  @media (max-width: 480px) {
    width: 52px;
    height: 52px;
    right: 18px;
    bottom: 18px;
    font-size: 1.1rem;
  }
`;

const FloatingContactButton = () => {
  const { t } = useTranslation();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const target = document.getElementById('contact');
    if (!target) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const target = document.getElementById('contact');
    if (!target) return;

    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(target);
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {!hidden && (
        <Button
          onClick={scrollToContact}
          aria-label={t('contactFormButton')}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: [1, 1.08, 1] }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
        >
          <FaPaperPlane />
        </Button>
      )}
    </AnimatePresence>
  );
};

export default FloatingContactButton;
