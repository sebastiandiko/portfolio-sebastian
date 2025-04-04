// src/Contact.js
import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import cvES from './assets/Sebastian Dikowiec - CV - Español.pdf';
import cvEN from './assets/Sebastian Dikowiec - CV - English.pdf';

const ContactSection = styled.section`
  background-color: #0d0d0d;
  color: #ffffff;
  text-align: center;
  padding: 80px 20px;

  @media (max-width: 600px) {
    padding: 60px 10px;
  }
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  color: #00ff00;
  margin-bottom: 40px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  p {
    margin: 10px 0;
    font-size: clamp(1rem, 2.5vw, 1.2rem);

    a {
      color: #00ff00;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #00d800;
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;

  a {
    color: #ffffff;
    font-size: clamp(1.5rem, 4vw, 2rem);
    transition: color 0.3s ease;

    &:hover {
      color: #00ff00;
    }
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const CVButton = styled.a`
  background-color: #00ff00;
  color: #0d0d0d;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00d800;
  }
`;

const CVButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

const Contact = () => {
  const { t } = useTranslation();

  return (
    <ContactSection>
      <Title>{t('contactTitle')}</Title>
      <ContactInfo>
        <p>
          {t('emailLabel')}: <a href="mailto:sebadikow@gmail.com">sebadikow@gmail.com</a>
        </p>
        <p>{t('phoneLabel')}: +543735529679</p>
      </ContactInfo>
      <SocialLinks>
        <a
          href="https://instagram.com/sebastiandiko"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/sebastian-dikowiec-6b9068221/"
          target="_blank"
          rel="noopener noreferrer"
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
    </ContactSection>
  );
};

export default Contact;
