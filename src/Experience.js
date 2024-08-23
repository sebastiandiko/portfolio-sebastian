// src/Experience.js
import React from 'react';
import styled from 'styled-components';

const ExperienceSection = styled.section`
  background-color: #0d0d0d;
  color: #ffffff;
  text-align: center;
  position: relative; /* Aseguramos que la sección no bloquee el cursor */
  z-index: 0; /* Nos aseguramos de que no bloquee el cursor */
`;

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding-top: 40px;
`;

const ExperienceCard = styled.div`
  background-color: #1a1a1a;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  h3 {
    color: #00ff00;
  }

  h4 {
    margin-bottom: 10px;
    font-weight: 400;
    color: #00d8ff;
  }

  p {
    opacity: 0.8;
    line-height: 1.5;
  }
`;

const Experience = () => {
  return (
    <ExperienceSection>
      <h2>Experiencia Laboral</h2>
      <ExperienceGrid>
        {/* Aquí irán las tarjetas de experiencia */}
      </ExperienceGrid>
    </ExperienceSection>
  );
};

export default Experience;
