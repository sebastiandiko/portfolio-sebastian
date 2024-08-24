// src/AboutMe.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTerminal } from 'react-icons/fa';

const AboutSection = styled.section`
  background-color: #1a1a1a;
  color: #ffffff;
  text-align: left;
  padding: 80px 0;
`;

const AboutContent = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: #00ff00;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const Icon = styled.span`
  margin-left: 10px;
  font-size: 2rem;
`;

const ImageContainer = styled(motion.div)`
  max-width: 300px;
  margin-right: 40px;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 50%;
`;

const TextContainer = styled.div`
  max-width: 600px;
`;

const Paragraph = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 20px;
  opacity: 0.8;
`;

const AboutMe = () => {
  return (
    <AboutSection>
      <AboutContent
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ImageContainer>
          <StyledImage src="https://via.placeholder.com/300" alt="Foto ficticia" />
        </ImageContainer>
        <TextContainer>
          <Title
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sobre Mí <Icon><FaTerminal /></Icon>
          </Title>
          <Paragraph
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Soy un desarrollador web apasionado por crear aplicaciones y sitios web modernos. Me encanta resolver problemas y explorar nuevas tecnologías.
          </Paragraph>
        </TextContainer>
      </AboutContent>
    </AboutSection>
  );
};

export default AboutMe;
