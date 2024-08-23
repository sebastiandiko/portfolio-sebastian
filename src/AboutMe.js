// src/AboutMe.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTerminal } from 'react-icons/fa';

const AboutSection = styled.section`
  background-color: #1a1a1a;
  color: #ffffff;
  text-align: center;
`;

const AboutContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
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

const Paragraph = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 20px;
  max-width: 800px;
  opacity: 0.8;
`;

const AboutMe = () => {
  return (
    <AboutSection>
      <AboutContent>
        <Title>
          Sobre Mí <Icon><FaTerminal /></Icon>
        </Title>
        <Paragraph
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Soy un desarrollador web apasionado por crear aplicaciones y sitios web modernos. Me encanta resolver problemas y explorar nuevas tecnologías. Trabajo principalmente con JavaScript, React y Node.js.
        </Paragraph>
        <Paragraph
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Fuera del código, me gusta colaborar en proyectos de código abierto y experimentar con nuevas herramientas de desarrollo.
        </Paragraph>
      </AboutContent>
    </AboutSection>
  );
};

export default AboutMe;
