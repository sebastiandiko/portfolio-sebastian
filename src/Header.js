// src/Header.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import background from './assets/backround.jpg';

// Contenedor del header con imagen de fondo y degradado
const HeaderContainer = styled.header`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: 
    linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)),
    url(${background}); /* Usamos la imagen importada */
  background-size: cover;
  background-position: center;
  color: #ffffff;
`;

// Título principal con efecto de "escritura"
const Title = styled(motion.h1)`
  font-size: 4rem;
  color: #00ff00;
  font-family: 'Fira Code', monospace;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 5px;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid rgba(255, 255, 255, 0.75); /* Simula un cursor */
`;

// Subtítulo bajo el título principal
const Subtitle = styled(motion.h2)`
  font-size: 2rem;
  color: #ffffff;
  font-family: 'Fira Code', monospace;
  text-align: center;
  margin-top: 20px;
  white-space: nowrap;
  overflow: hidden;
`;

const Header = () => {
  return (
    <HeaderContainer>
      {/* Título Principal */}
      <Title
        initial={{ width: 0, opacity: 0 }} // Inicialmente oculto con ancho 0
        animate={{ width: '100%', opacity: 1 }} // Aparece con el efecto de escritura
        transition={{ duration: 2, ease: 'easeInOut' }} // Duración de 2 segundos
      >
        Sebastian Dikowiec
      </Title>

      {/* Subtítulo */}
      <Subtitle
        initial={{ width: 0, opacity: 0 }} // Inicialmente oculto con ancho 0
        animate={{ width: '100%', opacity: 1 }} // Aparece con el efecto de escritura
        transition={{ duration: 2, delay: 1, ease: 'easeInOut' }} // Aparece después del título
      >
        Analista en Sistemas de Información
      </Subtitle>
    </HeaderContainer>
  );
};

export default Header;
