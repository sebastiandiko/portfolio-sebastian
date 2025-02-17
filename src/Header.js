import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import background from './assets/backround.jpg'; // Mantengo el mismo nombre del archivo

// Contenedor del header con efecto de opacidad en scroll
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

  /* Fondo con imagen y degradado */
  background: 
    linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)),
    url(${background});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => props.opacity}; /* Opacidad dinámica */
`;

// Título con efecto de escritura
const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 4rem);
  font-family: 'Fira Code', monospace;
  text-transform: uppercase;
  letter-spacing: 3px;
  border-right: 2px solid rgba(255, 255, 255, 0.75);
  overflow: hidden;
  white-space: nowrap;
`;

// Subtítulo con efecto de fade-in
const Subtitle = styled(motion.h2)`
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-family: 'Fira Code', monospace;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
`;

const Header = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 500, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer opacity={opacity}>
      <Title
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '100%', opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        Sebastian Dikowiec
      </Title>

      <Subtitle
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '100%', opacity: 1 }}
        transition={{ duration: 2, delay: 1, ease: 'easeInOut' }}
      >
        Ingeniero en Sistemas de Información
      </Subtitle>
    </HeaderContainer>
  );
};

export default Header;
