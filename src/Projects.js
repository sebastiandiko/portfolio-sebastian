import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toqqenImg from './assets/toQQen.png';
import pp1 from './assets/etl.png';

const ProjectSection = styled.section`
  background-color: #000000;
  color: #f5f5f7;
  padding: 120px 20px;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 120px;
  text-align: center;
  letter-spacing: -0.03em;
  background: linear-gradient(180deg, #ffffff 0%, #22c55e 200%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: #22c55e;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
  }
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 150px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 100px;
  }

  @media (max-width: 480px) {
    gap: 60px;
  }
`;

const ProjectItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 60px;
  flex-direction: ${props => props.$reverse ? 'row-reverse' : 'row'};

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 40px;
  }

  @media (max-width: 480px) {
    gap: 30px;
  }
`;

const ImageContainer = styled(motion.div)`
  flex: 1.2;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  
  /* Green tint overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(34, 197, 94, 0.15);
    z-index: 1;
    transition: all 0.5s ease;
    mix-blend-mode: color;
  }

  &:hover::before {
    background: rgba(34, 197, 94, 0);
  }

  &:hover {
    box-shadow: 0 20px 60px rgba(34, 197, 94, 0.25);
    border-color: rgba(34, 197, 94, 0.4);
  }
`;

const ProjectImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  filter: grayscale(80%) contrast(1.1);

  ${ImageContainer}:hover & {
    transform: scale(1.05);
    filter: grayscale(0%) contrast(1);
  }
`;

const InfoContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  position: relative;

  @media (min-width: 969px) {
    /* Slight negative margin to overlap the image slightly */
    ${props => props.$reverse ? 'margin-right: -40px;' : 'margin-left: -40px;'}
  }
`;

const ProjectTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 25px;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

  line-height: 1.2;

  &:hover {
    color: #22c55e;
    transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const DescriptionBox = styled.div`
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  margin-bottom: 35px;
  position: relative;
  transition: all 0.4s ease;
  
  &:hover {
    border-color: rgba(34, 197, 94, 0.3);
    background: #151515;
    box-shadow: 0 15px 50px rgba(34, 197, 94, 0.15);
  }

  p {
    font-size: 1.05rem;
    line-height: 1.7;
    color: #a1a1a6;
    margin: 0;
  }

  @media (max-width: 480px) {
    padding: 20px;
    margin-bottom: 25px;
    
    p {
      font-size: 0.95rem;
      line-height: 1.6;
    }
  }
`;

const LinkButton = styled(motion.a)`
  background: transparent;
  color: #22c55e;
  padding: 12px 28px;
  border-radius: 8px;
  border: 1px solid #22c55e;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(34, 197, 94, 0.1);
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
    transform: translateY(-2px);
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
        <ProjectContainer>
          {Array.isArray(projects) && projects.map((project, index) => {
            const isReverse = index % 2 !== 0;
            return (
              <ProjectItem 
                key={index} 
                $reverse={isReverse}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <ImageContainer>
                  <ProjectImage src={images[index]} alt={project.title} />
                </ImageContainer>
                
                <InfoContainer $reverse={isReverse}>
                  <motion.div
                    initial={{ opacity: 0, x: isReverse ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <ProjectTitle>{project.title}</ProjectTitle>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <DescriptionBox>
                      <p>{project.description}</p>
                    </DescriptionBox>
                  </motion.div>
                  
                  {links[index] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <LinkButton
                        href={links[index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('linkButton')}
                      </LinkButton>
                    </motion.div>
                  )}
                </InfoContainer>
              </ProjectItem>
            );
          })}
        </ProjectContainer>
      </ContentWrapper>
    </ProjectSection>
  );
};

export default Projects;
