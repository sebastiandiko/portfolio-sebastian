import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const FooterContainer = styled.footer`
  background-color: var(--bg);
  color: var(--text-2);
  text-align: center;
  padding: 40px 20px;
  border-top: 1px solid var(--line);
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
