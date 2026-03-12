import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toqqenImg from './assets/toQQen.png';
import pp1 from './assets/etl.png';

const ProjectSection = styled.section`
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
  max-width: 1100px;
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

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  padding: 0 10px;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 0;
  text-align: left;
  overflow: hidden;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }
`;

const ProjectImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
`;

const Description = styled.p`
  font-size: 1.05rem;
  line-height: 1.6;
  color: #a1a1a6;
  margin-bottom: 24px;
  flex: 1;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f7;
  color: #000000;
  padding: 12px 24px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    background-color: #ffffff;
    transform: scale(1.02);
  }
`;

const images = [pp1, toqqenImg];
const links = [
  'https://github.com/sebastiandiko/ETL-con-Python-y-SQL',
  'https://www.devtoqqen.com',
];

const Projects = () => {
  const { t, i18n } = useTranslation();
  const projects = t('projects', { returnObjects: true, lng: i18n.language });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <ProjectSection id="projects" key={i18n.language}>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {t('projectsTitle')}
        </Title>
        <ProjectGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} variants={itemVariants}>
              <ProjectImageWrapper>
                <ProjectImage src={images[index]} alt={project.title} />
              </ProjectImageWrapper>
              <ProjectContent>
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
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </ContentWrapper>
    </ProjectSection>
  );
};

export default Projects;
