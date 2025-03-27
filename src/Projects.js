import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaTimes } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import toqqenImg from './assets/toQQen.png';

// Importamos las imágenes desde src/assets
import pp1 from './assets/etl.png';
import p1 from './assets/p1.png';
import p1_1 from './assets/p1-1.png';
import p1_2 from './assets/p1-2.png';

const ProjectSection = styled.section`
  background: linear-gradient(135deg, #1a1a1a, #0d0d0d);
  color: #ffffff;
  text-align: center;
  padding: 100px 20px;
  position: relative;

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
  position: relative;

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
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-weight: bold;
  transition: background-color 0.3s ease;
  display: inline-block;
  margin-top: 10px;

  &:hover {
    background-color: #00d800;
  }
`;

const projects = [
  {
    title:
      'ETL con Python y SQL: Integración y Transformación de Datos a Gran Escala',
    description:
      'Implementé un pipeline ETL que extrae datos desde una API o un archivo CSV de gran tamaño, los procesa y transforma utilizando Pandas, y finalmente los carga en una base de datos PostgreSQL. La solución automatiza el flujo de datos, lo que resulta ideal para entornos de Big Data y análisis de información.',
    image: pp1,
    images: [p1, p1_1, p1_2],
    link: 'https://github.com/sebastiandiko/ETL-con-Python-y-SQL',
  },
  {
    title: 'Toqqen - Desarrollo Freelance de Apps y Webs',
    description:
      'Toqqen es un emprendimiento freelance donde ofrezco desarrollar aplicaciones PWA y sitios web personalizados para negocios, empresas, emprendedores, etc.',
    image: toqqenImg,
    images: [],
    link: 'https://www.devtoqqen.com',
  },
];

const Projects = () => {
  return (
    <ProjectSection>
      <Title
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mis Proyectos <FaLaptopCode />
      </Title>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectTitle>{project.title}</ProjectTitle>
            <Description>{project.description}</Description>
            {project.link && (
              <LinkButton
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </LinkButton>
            )}
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectSection>
  );
};

export default Projects;
