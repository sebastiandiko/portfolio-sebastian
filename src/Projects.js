// src/Projects.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLaptopCode } from 'react-icons/fa';

const ProjectSection = styled.section`
  background-color: #0d0d0d;
  color: #ffffff;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #00ff00;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 0 20px;
`;

const ProjectCard = styled(motion.div)`
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  h3 {
    font-size: 1.5rem;
    color: #00ff00;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #ffffff;
    opacity: 0.8;
    margin-bottom: 10px;
  }
`;

const Projects = () => {
  const projects = [
    {
      title: 'Landing Page Corporativa',
      description: 'Un proyecto de página de aterrizaje moderna y eficiente.',
    },
    {
      title: 'Aplicación de To-Do List',
      description: 'Aplicación para gestionar tareas con una interfaz sencilla.',
    },
    {
      title: 'E-commerce Store',
      description: 'Tienda en línea con carrito de compras y sistema de pagos.',
    },
    {
      title: 'Blog Personal',
      description: 'Plataforma de blogging con editor de texto enriquecido.',
    },
    {
      title: 'Dashboard de Analytics',
      description: 'Panel de control para visualizar métricas y datos clave.',
    },
  ];

  return (
    <ProjectSection>
      <Title>Mis Proyectos <FaLaptopCode /></Title>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 + index * 0.1 }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectSection>
  );
};

export default Projects;
