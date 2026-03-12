import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import cvES from './assets/Sebastian Dikowiec - CV - Español.pdf';
import cvEN from './assets/Sebastian Dikowiec - CV - English.pdf';

const ContactSection = styled.section`
  background-color: #000000;
  color: #f5f5f7;
  text-align: center;
  padding: 120px 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 40%);
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 600px) {
    padding: 80px 15px;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 60px 40px;
  border-radius: 30px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  @media (max-width: 600px) {
    padding: 40px 20px;
  }
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 40px;
  letter-spacing: -0.03em;
  background: linear-gradient(180deg, #ffffff 0%, #a1a1a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;

  p {
    margin: 8px 0;
    font-size: 1.15rem;
    color: #a1a1a6;

    a {
      color: #2997ff;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover {
        color: #147ce5;
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;

  a {
    color: #86868b;
    font-size: 1.8rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);

    &:hover {
      color: #ffffff;
      transform: translateY(-3px);
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const CVButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const CVButton = styled.a`
  background-color: #f5f5f7;
  color: #000000;
  padding: 14px 28px;
  border-radius: 30px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid transparent;

  &:hover {
    background-color: #ffffff;
    transform: scale(1.02);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
  }
`;

const Contact = () => {
  const { t } = useTranslation();

  return (
    <ContactSection>
      <ContentWrapper
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Title>{t('contactTitle')}</Title>
        <ContactInfo>
          <p>
            {t('emailLabel')}: <a href="mailto:sebadikow@gmail.com">sebadikow@gmail.com</a>
          </p>
          <p>{t('phoneLabel')}: +54 3735 529679</p>
        </ContactInfo>
        <SocialLinks>
          <a
            href="https://instagram.com/sebastiandiko"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/sebastian-dikowiec-6b9068221/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </SocialLinks>
        <CVButtonsContainer>
          <CVButton href={cvES} download>
            CV - Español
          </CVButton>
          <CVButton href={cvEN} download>
            CV - English
          </CVButton>
        </CVButtonsContainer>
      </ContentWrapper>
    </ContactSection>
  );
};

export default Contact;
