// src/Technologies.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaReact, FaNode, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaDatabase } from 'react-icons/fa';

const TechSection = styled.section`
  background-color: #0d0d0d;
  color: #ffffff;
  text-align: center;
  padding: 80px 0;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: #00ff00;
  margin-bottom: 50px;
`;

const TechGrid = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 40px;
`;

const TechCard = styled(motion.div)`
  background-color: #1a1a1a;
  padding: 30px;
  border-radius: 10px;
  width: 150px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease; /* Añadimos una transición para el movimiento */
  
  &:hover {
    transform: translateY(-10px); /* Mueve hacia arriba 10px al hacer hover */
  }

  h3 {
    margin-top: 15px;
    color: #00ff00;
  }

  svg {
    color: #ffffff;
    font-size: 2.5rem;
  }
`;

const Technologies = () => {
  const techs = [
    { name: 'React', icon: <FaReact /> },
    { name: 'Node.js', icon: <FaNode /> },
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'HTML5', icon: <FaHtml5 /> },
    { name: 'CSS3', icon: <FaCss3Alt /> },
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'Databases', icon: <FaDatabase /> },
  ];

  return (
    <TechSection>
      <Title
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Tecnologías que Utilizo
      </Title>
      <TechGrid>
        {techs.map((tech, index) => (
          <TechCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 + index * 0.1 }}
          >
            {tech.icon}
            <h3>{tech.name}</h3>
          </TechCard>
        ))}
      </TechGrid>
    </TechSection>
  );
};

export default Technologies;
