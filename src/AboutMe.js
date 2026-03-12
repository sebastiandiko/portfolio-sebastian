import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import sebastianImage1 from './assets/about-me-1.png';
import sebastianImage2 from './assets/about-me-2.png';

const pulseGlow = keyframes`
  0% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.5; transform: scale(1); }
`;

const AboutSection = styled.section`
  background-color: #000000;
  color: #f5f5f7;
  text-align: center;
  padding: 120px 20px;
  position: relative;
  overflow: hidden;

  /* Subtle background glow effect */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(34, 197, 94, 0.05) 0%, transparent 50%);
    z-index: 1;
    pointer-events: none;
    animation: ${pulseGlow} 8s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    padding: 80px 15px;
  }

  @media (max-width: 480px) {
    padding: 60px 10px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 60px;
  letter-spacing: -0.03em;
  background: linear-gradient(180deg, #ffffff 0%, #22c55e 200%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: #22c55e;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
  }
`;

const AboutLayout = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(34, 197, 94, 0.1);
  border-radius: 30px;
  padding: 60px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.3);
  }

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 40px 20px;
    text-align: center;
    gap: 40px;
  }

  @media (max-width: 480px) {
    padding: 30px 15px;
    gap: 30px;
  }
`;

const ImageContainer = styled(motion.div)`
  flex-shrink: 0;
  width: 320px;
  position: relative;
  
  @media (max-width: 900px) {
    width: 250px;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    width: 200px;
  }

  &:hover .img-default {
    opacity: 0;
    transform: scaleX(-1) scale(1.05);
  }

  &:hover .img-hover {
    opacity: 1;
    transform: scaleX(-1) scale(1.05);
  }
`;

const shadowPulse = keyframes`
  0% {
    filter: drop-shadow(0 0 15px rgba(34, 197, 94, 0.15));
  }
  50% {
    filter: drop-shadow(0 0 35px rgba(34, 197, 94, 0.4));
  }
  100% {
    filter: drop-shadow(0 0 15px rgba(34, 197, 94, 0.15));
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
  transform: scaleX(-1); /* mirror mode */
  animation: ${shadowPulse} 3s infinite ease-in-out;

  &.img-hover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  text-align: left;

  @media (max-width: 900px) {
    text-align: center;
  }
`;

const Paragraph = styled(motion.p)`
  font-size: 1.15rem;
  line-height: 1.8;
  color: #a1a1a6;
  margin-bottom: 20px;
  transition: color 0.3s ease;
  
  &:last-child {
    margin-bottom: 0;
  }

  strong, .highlight {
    color: #ffffff;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  ${AboutLayout}:hover & {
    color: #c1c1c6;
  }

  ${AboutLayout}:hover & strong, ${AboutLayout}:hover & .highlight {
    color: #22c55e;
    text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <AboutSection>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {t('aboutTitle')}
        </Title>

        <AboutLayout
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ImageContainer>
            <StyledImage className="img-default" src={sebastianImage1} alt="Sebastian" />
            <StyledImage className="img-hover" src={sebastianImage2} alt="Sebastian Hover" />
          </ImageContainer>

          <TextContainer>
            <Paragraph>
              {t('aboutDescription')}
            </Paragraph>
          </TextContainer>
        </AboutLayout>
      </ContentWrapper>
    </AboutSection>
  );
};

export default AboutMe;
