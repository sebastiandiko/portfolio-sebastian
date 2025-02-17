// src/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #ffffff;
  text-align: center;
  padding: 40px 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2025 Sebastian Dikowiec. Todos los derechos reservados.</p>
    </FooterContainer>
  );
};

export default Footer;
