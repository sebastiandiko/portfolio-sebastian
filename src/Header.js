import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MatrixRain from './MatrixRain';

const HeaderContainer = styled.header`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  background-color: #000000;
  overflow: hidden;

  /* Gradient overlay to focus center and darken edges */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.9) 100%);
    z-index: 2;
    pointer-events: none;
  }
`;

const ContentWrapper = styled(motion.div)`
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  margin-bottom: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #a1a1a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;

  @media (max-width: 480px) {
    font-size: clamp(2rem, 10vw, 3rem);
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 400;
  color: #86868b;
  max-width: 600px;
  line-height: 1.5;
`;

const GlassButton = styled.button`
  position: absolute;
  top: 30px;
  right: 40px;
  padding: 10px 24px;
  background: rgba(255, 255, 255, 0.05);
  color: #f5f5f7;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  cursor: pointer;
  border-radius: 30px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    top: 20px;
    right: 20px;
    padding: 8px 16px;
    font-size: 0.85rem;
  }
`;

const HintBubble = styled(motion.div)`
  position: absolute;
  top: 80px;
  right: 40px;
  background: rgba(255, 255, 255, 0.1);
  color: #f5f5f7;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    top: -8px;
    right: 32px;
    border-width: 0 8px 8px 8px;
    border-style: solid;
    border-color: transparent transparent rgba(255, 255, 255, 0.1) transparent;
  }

  @media (max-width: 480px) {
    top: 65px;
    right: 20px;
    padding: 10px 15px;
    font-size: 0.8rem;
    
    &::after {
      right: 20px;
    }
  }
`;

const Header = () => {
  const [showHint, setShowHint] = useState(() => !localStorage.getItem('languageHintClosed'));
  const { t, i18n } = useTranslation();
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const closeHint = () => {
    setShowHint(false);
    localStorage.setItem('languageHintClosed', 'true');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <HeaderContainer>
      <MatrixRain />
      
      <GlassButton onClick={toggleLanguage}>
        {i18n.language === 'es' ? 'English' : 'Español'}
      </GlassButton>

      {showHint && (
        <HintBubble
          onClick={closeHint}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {t('changeLanguageHint')} ✕
        </HintBubble>
      )}

      <ContentWrapper style={{ y, opacity }} variants={containerVariants} initial="hidden" animate="show">
        <Title variants={itemVariants}>
          {t('title')}
        </Title>
        <Subtitle variants={itemVariants}>
          {t('subtitle')}
        </Subtitle>
      </ContentWrapper>
    </HeaderContainer>
  );
};

export default Header;
