import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaTimes } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
  position: relative; /* Para posicionar el botón "NOTA" dentro de esta sección */

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

const GitHubButton = styled.a`
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #00ff88;
  }
`;

const CarouselImage = styled.img`
  max-width: 90%;
  max-height: 80vh;
  margin: 0 auto;
  display: block;
  object-fit: contain;
`;

// Botón "NOTA" posicionado de forma absoluta dentro de ProjectSection
const NoteButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #00ff88;
  color: #0d0d0d;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  cursor: pointer;
  z-index: 1100;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00d800;
  }
`;

// Popup (modal) para la Nota con estilo más profesional
const NoteModalContent = styled.div`
  background-color: #1a1a1a;
  padding: 30px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
  border: 1px solid #00ff88;
  box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
`;

const NoteText = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: #ffffff;
  margin: 20px 0;
`;

const projects = [
  {
    title:
      'ETL con Python y SQL: Integración y Transformación de Datos a Gran Escala',
    description:
      'Implementé un pipeline ETL que extrae datos desde una API o un archivo CSV de gran tamaño, los procesa y transforma utilizando Pandas, y finalmente los carga en una base de datos PostgreSQL. La solución automatiza el flujo de datos, lo que resulta ideal para entornos de Big Data y análisis de información.',
    image: pp1,
    images: [p1, p1_1, p1_2],
    github: 'https://github.com/sebastiandiko/ETL-con-Python-y-SQL',
  },
  // Puedes agregar más proyectos aquí...
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showNote, setShowNote] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseCarousel = (e) => {
    if (e.target.id === 'overlay') {
      setSelectedProject(null);
    }
  };

  const handleCloseNote = (e) => {
    if (e.target.id === 'note-overlay') {
      setShowNote(false);
    }
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
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 + index * 0.1 }}
          >
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectTitle>{project.title}</ProjectTitle>
            <Description>{project.description}</Description>
            {project.github && (
              <GitHubButton
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </GitHubButton>
            )}
          </ProjectCard>
        ))}
      </ProjectGrid>

      {/* Modal del Carrusel */}
      {selectedProject && (
        <ModalOverlay id="overlay" onClick={handleCloseCarousel}>
          <CloseButton onClick={() => setSelectedProject(null)}>
            <FaTimes />
          </CloseButton>
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            {selectedProject.images.map((image, idx) => (
              <div key={idx}>
                <CarouselImage src={image} alt={`Project slide ${idx}`} />
              </div>
            ))}
          </Carousel>
        </ModalOverlay>
      )}

      {/* Botón de Nota (solo dentro de ProjectSection) */}
      <NoteButton onClick={() => setShowNote(true)}>NOTA</NoteButton>

      {/* Modal de Nota */}
      {showNote && (
        <ModalOverlay id="note-overlay" onClick={handleCloseNote}>
          <NoteModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowNote(false)}>
              <FaTimes />
            </CloseButton>
            <NoteText>
              Iré colocando todos mis proyectos en esta sección, los que
              aparecen actualmente no son todos.
            </NoteText>
          </NoteModalContent>
        </ModalOverlay>
      )}
    </ProjectSection>
  );
};

export default Projects;
