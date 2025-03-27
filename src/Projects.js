import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLaptopCode } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import toqqenImg from './assets/toQQen.png';
import pp1 from './assets/etl.png';

const ProjectSection = styled.section`
  background: linear-gradient(135deg, #1a1a1a, #0d0d0d);
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 10px;
`;

const ProjectCard = styled(motion.div)`
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 15px;
  text-align: left;
  box-shadow: 0px 4px 10px rgba(0, 255, 136, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 255, 136, 0.4);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  color: #00ff88;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #ffffff;
  opacity: 0.85;
  margin-bottom: 10px;
`;

const LinkButton = styled.a`
  background-color: #00ff88;
  color: #0d0d0d;
  padding: 8px 16px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00d800;
  }
`;

const images = [pp1, toqqenImg];
const links = [
  'https://github.com/sebastiandiko/ETL-con-Python-y-SQL',
  'https://www.devtoqqen.com',
];

const Projects = () => {
  const { t, i18n } = useTranslation();

  // Esto asegura que React escuche los cambios del idioma y re-renderice:
  const projects = t('projects', { returnObjects: true, lng: i18n.language });

  return (
    <ProjectSection key={i18n.language}>
      <Title
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {t('projectsTitle')} <FaLaptopCode />
      </Title>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectImage src={images[index]} alt={project.title} />
            <ProjectTitle>{project.title}</ProjectTitle>
            <Description>{project.description}</Description>
            {links[index] && (
              <LinkButton
                href={links[index]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('linkButton')}
              </LinkButton>
            )}
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectSection>
  );
};

export default Projects;
