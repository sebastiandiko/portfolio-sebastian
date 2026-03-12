import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaReact, FaJs, FaGitAlt } from 'react-icons/fa';
import { SiPython, SiPostgresql, SiMongodb, SiAmazonwebservices, SiPowerbi, SiGooglegemini, SiOpenai } from 'react-icons/si';
import { DiTerminal, DiJava } from 'react-icons/di';
import { useTranslation } from 'react-i18next';

const TechSection = styled.section`
  background-color: #0a0a0c;
  color: #f5f5f7;
  text-align: center;
  padding: 120px 20px;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

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

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-250px * 12)); } /* 12 is the number of original items */
`;

const CarouselContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 20px 0;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 150px;
    height: 100%;
    z-index: 2;
    pointer-events: none;

    @media (max-width: 768px) {
      width: 50px;
    }
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, #0a0a0c 0%, transparent 100%);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, #0a0a0c 0%, transparent 100%);
  }
`;

const TechTrack = styled(motion.div)`
  display: flex;
  width: calc(250px * 24); /* Double the items for infinite scroll */
  animation: ${scroll} 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const TechCard = styled.div`
  width: 250px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 30px 20px;
  border-radius: 24px;
  margin: 0 15px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-5px);
    background: rgba(34, 197, 94, 0.08);
    border-color: rgba(34, 197, 94, 0.4);
    box-shadow: 0 12px 35px rgba(34, 197, 94, 0.2);
  }

  @media (max-width: 480px) {
    width: 200px;
    padding: 20px 15px;
    margin: 0 10px;
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
    color: #22c55e;
    text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
  }

  &:hover svg {
    color: #22c55e;
    transform: scale(1.1);
    filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.4));
  }
`;

const IconGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const N8nIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.001 0l-4.14 2.19v9.117L4.14 13.26v4.618l3.72-1.968v-9.117l3.72-1.968v9.117l3.72-1.968V2.834L12.001 0zm0 10.74l4.14-2.19v-4.62l-4.14 2.19v4.62zm0 13.26l4.14-2.19v-9.117l3.72-1.968v-4.618l-3.72 1.968v9.117l-3.72 1.968v-9.117l-3.72 1.968v4.618l7.44 3.936z"/>
  </svg>
);

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
    { name: 'Power BI', icon: <SiPowerbi /> },
    { name: 'OpenAI', icon: <SiOpenai /> },
    { name: 'Gemini', icon: <SiGooglegemini /> },
    { name: 'n8n', icon: <N8nIcon /> }
  ];

  // We duplicate the array to achieve seamless infinite scroll
  const duplicatedTechs = [...techs, ...techs];

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
        <CarouselContainer>
          <TechTrack>
            {duplicatedTechs.map((tech, index) => (
              <TechCard key={index}>
                {tech.icon}
                <h3>{tech.name}</h3>
              </TechCard>
            ))}
          </TechTrack>
        </CarouselContainer>
      </ContentWrapper>
    </TechSection>
  );
};

export default Technologies;