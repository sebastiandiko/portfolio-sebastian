import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ExperienceSection = styled.section`
  background: linear-gradient(135deg, #1a1a1a, #0d0d0d);
  color: #ffffff;
  text-align: center;
  padding: 100px 20px;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: #00ff88;
  margin-bottom: 50px;
`;

const ExperienceGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  max-width: 1100px;
  margin: 0 auto;
`;

const ExperienceCard = styled(motion.div)`
  background-color: #1a1a1a;
  padding: 30px;
  border-radius: 15px;
  text-align: left;
  width: 320px;
  box-shadow: 0px 4px 10px rgba(0, 255, 136, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 6px 15px rgba(0, 255, 136, 0.4);
  }
`;

const JobTitle = styled.h3`
  font-size: 1.4rem;
  color: #00ff88;
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
  opacity: 0.85;
`;

const Experience = () => {
  const { t } = useTranslation();
  const experiences = t('jobs', { returnObjects: true });

  return (
    <ExperienceSection>
      <Title
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {t('experienceTitle')}
      </Title>
      <ExperienceGrid>
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
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
