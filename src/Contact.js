import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaEnvelope, FaPhoneAlt, FaFileDownload } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import cvES from './assets/cv-es.pdf';
import cvEN from './assets/cv-en.pdf';

const ContactSection = styled.section`
  background-color: #000000;
  color: #f5f5f7;
  padding: 120px 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Ambient background glow */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    height: 80vw;
    max-width: 800px;
    max-height: 800px;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, rgba(0, 0, 0, 0) 70%);
    z-index: 0;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 80px 15px;
  }

  @media (max-width: 480px) {
    padding: 60px 10px;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 900px;
  width: 100%;
  position: relative;
  z-index: 2;
  background: rgba(15, 15, 15, 0.6);
  border: 1px solid rgba(34, 197, 94, 0.2);
  padding: 80px 60px;
  border-radius: 40px;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    padding: 50px 30px;
    border-radius: 30px;
  }

  @media (max-width: 480px) {
    padding: 40px 20px;
    border-radius: 24px;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled(motion.h2)`
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 20px;
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, #ffffff 0%, #22c55e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #a1a1a6;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const InfoCard = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;

  /* Hover gradient */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  @media (max-width: 480px) {
    padding: 20px;
    gap: 15px;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(34, 197, 94, 0.3);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(34, 197, 94, 0.1);

    &::before {
      opacity: 1;
    }
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
  transition: all 0.3s ease;

  ${InfoCard}:hover & {
    background: #22c55e;
    color: #000000;
    transform: scale(1.1);
  }
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;

  .label {
    font-size: 0.9rem;
    color: #86868b;
    margin-bottom: 5px;
    font-weight: 500;
  }

  .value {
    font-size: 1.1rem;
    color: #ffffff;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  ${InfoCard}:hover .value {
    color: #22c55e;
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: #a1a1a6;
    font-size: 1.6rem;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);

    &:hover {
      color: #000000;
      background: #22c55e;
      transform: translateY(-5px) scale(1.1);
      box-shadow: 0 10px 20px rgba(34, 197, 94, 0.3);
    }
  }
`;

const CVButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
`;

const CVButton = styled(motion.a)`
  background-color: transparent;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;

  /* Animated background hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    border-color: #22c55e;
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
    
    &::before {
      left: 100%;
    }

    svg {
      color: #22c55e;
      transform: translateY(2px);
    }
  }

  svg {
    transition: all 0.3s ease;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.95rem;
    width: 100%;
    justify-content: center;
  }
`;

const Contact = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <ContactSection>
      <ContentWrapper
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <HeaderSection>
          <Title variants={itemVariants}>{t('contactTitle')}</Title>
          <Subtitle variants={itemVariants}>
            ¿Tienes un proyecto en mente? ¡Hablemos!
          </Subtitle>
        </HeaderSection>

        <ContactGrid>
          <InfoCard
            href="mailto:sebadikow@gmail.com"
            variants={itemVariants}
            whileHover="hover"
          >
            <IconWrapper><FaEnvelope /></IconWrapper>
            <InfoText>
              <span className="label">{t('emailLabel')}</span>
              <span className="value">sebadikow@gmail.com</span>
            </InfoText>
          </InfoCard>

          <InfoCard
            href="tel:+543735529679"
            variants={itemVariants}
            whileHover="hover"
          >
            <IconWrapper><FaPhoneAlt /></IconWrapper>
            <InfoText>
              <span className="label">{t('phoneLabel')}</span>
              <span className="value">+54 3735 529679</span>
            </InfoText>
          </InfoCard>
        </ContactGrid>

        <BottomSection>
          <motion.div variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants}>
            <CVButtonsContainer>
              <CVButton
                href={cvES}
                download="Sebastian_Dikowiec_CV_ES.pdf"
              >
                <FaFileDownload /> CV - Español
              </CVButton>
              <CVButton
                href={cvEN}
                download="Sebastian_Dikowiec_CV_EN.pdf"
              >
                <FaFileDownload /> CV - English
              </CVButton>
            </CVButtonsContainer>
          </motion.div>
        </BottomSection>
      </ContentWrapper>
    </ContactSection>
  );
};

export default Contact;
