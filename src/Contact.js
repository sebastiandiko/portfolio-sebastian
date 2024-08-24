// src/Contact.js
import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

// Contenedor de la sección de contacto
const ContactSection = styled.section`
  background-color: #0d0d0d;
  color: #ffffff;
  text-align: center;
  padding: 80px 0;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #00ff00;
  margin-bottom: 40px;
`;

// Contenedor para los datos de contacto
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  p {
    margin: 10px 0;
    font-size: 1.2rem;
  }
`;

// Estilos para los enlaces de redes sociales
const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;

  a {
    color: #ffffff;
    font-size: 2rem;
    transition: color 0.3s ease;

    &:hover {
      color: #00ff00;
    }
  }
`;

// Botón para descargar el CV
const CVButton = styled.a`
  background-color: #00ff00;
  color: #0d0d0d;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00d800;
  }
`;

const Contact = () => {
  return (
    <ContactSection>
      <Title>Contacto</Title>
      <ContactInfo>
        <p>Email: <a href="mailto:sebadikow@gmail.com" style={{ color: '#00ff00', textDecoration: 'none' }}>sebadikow@gmail.com</a></p>
        <p>Teléfono: +54 3735529679</p>
      </ContactInfo>
      
      <SocialLinks>
        <a href="https://instagram.com/tu-usuario" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com/in/tu-usuario" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </SocialLinks>
      
      <CVButton href="/path/to/cv.pdf" download>
        Descargar CV
      </CVButton>
    </ContactSection>
  );
};

export default Contact;
