import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const FooterContainer = styled.footer`
  background-color: #000000;
  color: #86868b;
  text-align: center;
  padding: 40px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.9rem;
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
