import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaReact, FaJs, FaGitAlt } from 'react-icons/fa';
import { SiPython, SiPostgresql, SiMongodb, SiAmazonwebservices, SiPowerbi } from 'react-icons/si';
import { DiTerminal, DiJava } from 'react-icons/di';
import { useTranslation } from 'react-i18next';

const TechSection = styled.section`
  background: linear-gradient(135deg, #0d0d0d, #1a1a1a);
  color: #ffffff;
  text-align: center;
  padding: 100px 20px;

  @media (max-width: 768px) {
    padding: 80px 10px;
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: #00ff88;
  margin-bottom: 50px;
`;

const TechRow = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TechCard = styled(motion.div)`
  background-color: #1a1a1a;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 255, 136, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  min-width: 130px;

  &:hover {
    transform: scale(1.15);
    box-shadow: 0px 6px 15px rgba(0, 255, 136, 0.4);
  }

  h3 {
    margin-top: 10px;
    font-size: 1rem;
    color: #00ff88;
  }

  svg {
    color: #ffffff;
    font-size: 3rem;
    transition: color 0.3s ease;
  }

  &:hover svg {
    color: #00ff88;
  }
`;

const Technologies = () => {
  const { t } = useTranslation();

  const techs = [
    { name: 'React', icon: <FaReact /> },
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'Python', icon: <SiPython /> },
    { 
      name: 'SQL / NoSQL', 
      icon: (
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
          <SiPostgresql />
          <SiMongodb />
        </div>
      ) 
    },
    { name: 'Bash', icon: <DiTerminal /> },
    { name: 'Java', icon: <DiJava /> },
    { name: 'AWS', icon: <SiAmazonwebservices /> },
    { name: 'Power BI', icon: <SiPowerbi /> }
  ];

  return (
    <TechSection>
      <Title
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {t('technologiesTitle')}
      </Title>
      <TechRow>
        {techs.map((tech, index) => (
          <TechCard
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 + index * 0.1 }}
          >
            {tech.icon}
            <h3>{tech.name}</h3>
          </TechCard>
        ))}
      </TechRow>
    </TechSection>
  );
};

export default Technologies;