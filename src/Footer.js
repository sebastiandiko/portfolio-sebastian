// src/Footer.js
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #ffffff;
  text-align: center;
  padding: 40px 0;
`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <p>{t('footerText')}</p>
    </FooterContainer>
  );
};

export default Footer;
