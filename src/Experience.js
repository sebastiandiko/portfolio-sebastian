// src/Experience.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ExperienceSection = styled.section`
  background-color: #2a2a2a;
  color: #ffffff;
  text-align: center;
  padding: 80px 0;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: #00ff00;
  margin-bottom: 50px;
`;

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 0 20px;
`;

const ExperienceCard = styled(motion.div)`
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4);
  }
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  color: #00ff00;
  margin-bottom: 10px;
`;

const Company = styled.h4`
  font-size: 1.2rem;
  color: #00d8ff;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #ffffff;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ExperienceCard}:hover & {
    opacity: 1;
  }
`;

const experiences = [
  {
    jobTitle: 'Desarrollador Full Stack',
    company: 'Tech Solutions',
    description: 'Desarrollé aplicaciones web modernas utilizando React y Node.js.',
  },
  {
    jobTitle: 'Ingeniero de Software',
    company: 'SoftCorp',
    description: 'Optimicé el rendimiento del sistema backend.',
  },
  {
    jobTitle: 'Desarrollador Frontend',
    company: 'Creative Agency',
    description: 'Diseñé interfaces de usuario interactivas.',
  },
];

const Experience = () => {
  return (
    <ExperienceSection>
      <Title
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Experiencia Laboral
      </Title>
      <ExperienceGrid>
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 + index * 0.1 }}
          >
            <JobTitle>{experience.jobTitle}</JobTitle>
            <Company>{experience.company}</Company>
            <Description>{experience.description}</Description>
          </ExperienceCard>
        ))}
      </ExperienceGrid>
    </ExperienceSection>
  );
};

export default Experience;
