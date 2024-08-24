// src/Projects.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLaptopCode } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importamos los estilos del carrusel

const ProjectSection = styled.section`
  background-color: #0d0d0d;
  color: #ffffff;
  text-align: center;
  padding: 80px 0;
`;

const Title = styled(motion.h2)`
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
  position: relative;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: #00ff00;
  margin-bottom: 10px;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #ffffff;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const projects = [
  {
    title: 'Landing Page Corporativa',
    description: 'Un proyecto de página de aterrizaje moderna y eficiente.',
    image: 'https://via.placeholder.com/600x400.png?text=Landing+Page',
    images: [
      'https://via.placeholder.com/600x400.png?text=Landing+1',
      'https://via.placeholder.com/600x400.png?text=Landing+2',
      'https://via.placeholder.com/600x400.png?text=Landing+3',
    ],
  },
  {
    title: 'Aplicación de To-Do List',
    description: 'Aplicación para gestionar tareas con una interfaz sencilla.',
    image: 'https://via.placeholder.com/600x400.png?text=To-Do+App',
    images: [
      'https://via.placeholder.com/600x400.png?text=To-Do+1',
      'https://via.placeholder.com/600x400.png?text=To-Do+2',
      'https://via.placeholder.com/600x400.png?text=To-Do+3',
    ],
  },
  {
    title: 'E-commerce Store',
    description: 'Tienda en línea con carrito de compras y sistema de pagos.',
    image: 'https://via.placeholder.com/600x400.png?text=E-commerce+Store',
    images: [
      'https://via.placeholder.com/600x400.png?text=E-commerce+1',
      'https://via.placeholder.com/600x400.png?text=E-commerce+2',
      'https://via.placeholder.com/600x400.png?text=E-commerce+3',
    ],
  },
  {
    title: 'Blog Personal',
    description: 'Plataforma de blogging con editor de texto enriquecido.',
    image: 'https://via.placeholder.com/600x400.png?text=Personal+Blog',
    images: [
      'https://via.placeholder.com/600x400.png?text=Blog+1',
      'https://via.placeholder.com/600x400.png?text=Blog+2',
      'https://via.placeholder.com/600x400.png?text=Blog+3',
    ],
  },
  {
    title: 'Dashboard de Analytics',
    description: 'Panel de control para visualizar métricas y datos clave.',
    image: 'https://via.placeholder.com/600x400.png?text=Analytics+Dashboard',
    images: [
      'https://via.placeholder.com/600x400.png?text=Analytics+1',
      'https://via.placeholder.com/600x400.png?text=Analytics+2',
      'https://via.placeholder.com/600x400.png?text=Analytics+3',
    ],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseCarousel = () => {
    setSelectedProject(null);
  };

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
          <ProjectCard
            key={index}
            onClick={() => handleProjectClick(project)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 + index * 0.1 }}
          >
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectTitle>{project.title}</ProjectTitle>
            <Description>{project.description}</Description>
          </ProjectCard>
        ))}
      </ProjectGrid>

      {/* Carrusel Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={handleCloseCarousel}
        >
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            {selectedProject.images.map((image, idx) => (
              <div key={idx}>
                <img src={image} alt={`Project slide ${idx}`} />
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </ProjectSection>
  );
};

export default Projects;
