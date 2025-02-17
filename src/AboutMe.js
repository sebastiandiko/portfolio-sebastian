import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTerminal } from 'react-icons/fa';
import sebastianImage from './assets/sebastian.png'; // Asegúrate de que la ruta sea correcta

const AboutSection = styled.section`
  background: linear-gradient(135deg, #1a1a1a, #111);
  color: #ffffff;
  text-align: center;
  padding: 100px 20px;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

const AboutContent = styled(motion.div)`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: #00ff88;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const Icon = styled.span`
  font-size: 2rem;
  color: #00ff88;
`;

const ImageContainer = styled(motion.div)`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 5px 20px rgba(0, 255, 136, 0.4);
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 8px 25px rgba(0, 255, 136, 0.6);
  }

  @media (max-width: 900px) {
    width: 220px;
    height: 220px;
    margin-bottom: 20px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextContainer = styled.div`
  max-width: 600px;
  text-align: left;

  @media (max-width: 900px) {
    text-align: center;
  }
`;

const Paragraph = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  line-height: 1.8;
  opacity: 0.85;
  text-align: justify;

  @media (max-width: 900px) {
    text-align: center;
  }
`;

const AboutMe = () => {
  return (
    <AboutSection>
      <Title
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Sobre Mí <Icon><FaTerminal /></Icon>
      </Title>

      <AboutContent
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <ImageContainer
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <StyledImage src={sebastianImage} alt="Sebastian" />
        </ImageContainer>

        <TextContainer>
          <Paragraph
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
          Soy Ingeniero en Sistemas de Información con experiencia en desarrollo web y análisis de datos. Apasionado por la innovación y el aprendizaje continuo, me especializo en crear soluciones eficientes y escalables. Disfruto resolver problemas, optimizar procesos y trabajar con tecnologías modernas para aportar valor en cada proyecto.          </Paragraph>
        </TextContainer>
      </AboutContent>
    </AboutSection>
  );
};

export default AboutMe;
