// src/Header.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header`
  padding: 20px;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  color: #00aaff; /* Azul claro */
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        Mi Portafolio Creativo
      </Title>
    </HeaderContainer>
  );
};

export default Header;
