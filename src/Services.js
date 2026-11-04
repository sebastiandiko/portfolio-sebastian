import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaProjectDiagram, FaRobot, FaBrain, FaPlug, FaTasks } from 'react-icons/fa';
import shineHover from './shineEffect';
import { getLenisInstance } from './lenisInstance';

const icons = [FaProjectDiagram, FaRobot, FaBrain, FaPlug, FaTasks];

const Section = styled.section`
  background-color: #000000;
  padding: 120px 20px;
  max-width: none;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
  ${shineHover('linear-gradient(180deg, #ffffff 0%, #ffffff 200%)')}
`;

const Subtitle = styled(motion.p)`
  max-width: 680px;
  text-align: center;
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  margin-bottom: 70px;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  position: relative;
  padding: 36px 30px;
  border-radius: 22px;
  background: #0b0b0c;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: border-color 0.4s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(420px circle at 50% 0%, rgba(255, 255, 255, 0.09), transparent 60%);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background: #111113;
    transform: translateY(-6px);
  }
  &:hover::after {
    opacity: 1;
  }
`;

const IconBox = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  color: #000000;
  font-size: 1.35rem;
  margin-bottom: 24px;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 12px;
`;

const CardText = styled.p`
  font-size: 0.98rem;
  line-height: 1.65;
`;

const Cta = styled(motion.button)`
  margin-top: 60px;
  padding: 14px 32px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: transparent;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #ffffff;
    color: #000000;
  }
`;

const ease = [0.16, 1, 0.3, 1];
const reveal = {
  initial: { opacity: 0, y: 40, filter: 'blur(12px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1, ease },
};

const Services = () => {
  const { t } = useTranslation();
  const items = t('services', { returnObjects: true });

  const goContact = () => {
    const el = document.getElementById('contact');
    const lenis = getLenisInstance();
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -20 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="services">
      <Wrapper>
        <Title {...reveal}>{t('servicesTitle')}</Title>
        <Subtitle {...reveal}>{t('servicesSubtitle')}</Subtitle>
        <Grid>
          {Array.isArray(items) &&
            items.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Card
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, ease, delay: (i % 3) * 0.1 }}
                >
                  <IconBox><Icon /></IconBox>
                  <CardTitle>{item.title}</CardTitle>
                  <CardText>{item.description}</CardText>
                </Card>
              );
            })}
        </Grid>
        <Cta data-magnetic {...reveal} onClick={goContact}>{t('servicesCta')}</Cta>
      </Wrapper>
    </Section>
  );
};

export default Services;
