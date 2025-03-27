import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import background from './assets/backround.jpg';

const HeaderContainer = styled.header`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #ffffff;
  text-align: center;
  transition: opacity 0.5s ease-in-out;
  background: 
    linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)),
    url(${background});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => props.opacity};
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 4rem);
  font-family: 'Fira Code', monospace;
  text-transform: uppercase;
  letter-spacing: 3px;
  border-right: 2px solid rgba(255, 255, 255, 0.75);
  overflow: hidden;
  white-space: nowrap;
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-family: 'Fira Code', monospace;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
`;

const LangButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background: #00ff88;
  color: #0d0d0d;
  border: none;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 255, 136, 0.5);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 6px 15px rgba(0, 255, 136, 0.7);
  }
`;

const HintBubble = styled(motion.div)`
  position: absolute;
  top: 70px;
  right: 20px;
  background: #00ff88;
  color: #0d0d0d;
  padding: 15px 20px;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0px 4px 15px rgba(0,255,136,0.6);

  &::after {
    content: '';
    position: absolute;
    top: -10px;
    right: 15px;
    border-width: 0 10px 10px 10px;
    border-style: solid;
    border-color: transparent transparent #00ff88 transparent;
  }
`;

const Header = () => {
  const [opacity, setOpacity] = useState(1);
  const [showHint, setShowHint] = useState(() => !localStorage.getItem('languageHintClosed'));
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 500, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const closeHint = () => {
    setShowHint(false);
    localStorage.setItem('languageHintClosed', 'true');
  };

  return (
    <HeaderContainer opacity={opacity}>
      <LangButton onClick={toggleLanguage}>
        {i18n.language === 'es' ? 'EN' : 'ES'}
      </LangButton>

      {showHint && (
        <HintBubble
          onClick={closeHint}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
        >
          {t('changeLanguageHint')} ✖️
        </HintBubble>
      )}

      <Title
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '100%', opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        {t('title')}
      </Title>

      <Subtitle
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '100%', opacity: 1 }}
        transition={{ duration: 2, delay: 1, ease: 'easeInOut' }}
      >
        {t('subtitle')}
      </Subtitle>
    </HeaderContainer>
  );
};

export default Header;
