import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import sebastianImage from './assets/sebastian.png';

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
    background: radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 40%);
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 80px 15px;
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
  background: linear-gradient(180deg, #ffffff 0%, #a1a1a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AboutLayout = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 30px;
  padding: 60px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 40px 20px;
    text-align: center;
    gap: 40px;
  }
`;

const ImageContainer = styled(motion.div)`
  flex-shrink: 0;
  width: 260px;
  height: 260px;
  border-radius: 30px; /* Apple-style rounded squarish */
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 900px) {
    width: 200px;
    height: 200px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: scale(1.05);
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
  line-height: 1.7;
  color: #a1a1a6;
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
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
            <StyledImage src={sebastianImage} alt="Sebastian" />
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
