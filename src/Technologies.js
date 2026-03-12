import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaReact, FaJs, FaGitAlt } from 'react-icons/fa';
import { SiPython, SiPostgresql, SiMongodb, SiAmazonwebservices, SiPowerbi } from 'react-icons/si';
import { DiTerminal, DiJava } from 'react-icons/di';
import { useTranslation } from 'react-i18next';

const TechSection = styled.section`
  background-color: #000000;
  color: #f5f5f7;
  text-align: center;
  padding: 120px 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 80px 15px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 60px;
  letter-spacing: -0.03em;
  background: linear-gradient(180deg, #ffffff 0%, #a1a1a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TechGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
  justify-content: center;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TechCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 30px 20px;
  border-radius: 24px;
  text-align: center;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  h3 {
    margin-top: 15px;
    font-size: 0.95rem;
    font-weight: 500;
    color: #a1a1a6;
    transition: color 0.4s ease;
  }

  svg {
    color: #86868b;
    font-size: 2.5rem;
    transition: all 0.4s ease;
  }

  &:hover h3 {
    color: #ffffff;
  }

  &:hover svg {
    color: #ffffff;
    transform: scale(1.1);
  }
`;

const IconGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
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
        <IconGroup>
          <SiPostgresql />
          <SiMongodb />
        </IconGroup>
      ) 
    },
    { name: 'Bash', icon: <DiTerminal /> },
    { name: 'Java', icon: <DiJava /> },
    { name: 'AWS', icon: <SiAmazonwebservices /> },
    { name: 'Power BI', icon: <SiPowerbi /> }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <TechSection>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {t('technologiesTitle')}
        </Title>
        <TechGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {techs.map((tech, index) => (
            <TechCard key={index} variants={itemVariants}>
              {tech.icon}
              <h3>{tech.name}</h3>
            </TechCard>
          ))}
        </TechGrid>
      </ContentWrapper>
    </TechSection>
  );
};

export default Technologies;