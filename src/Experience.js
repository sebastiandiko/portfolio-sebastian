import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import shineHover from './shineEffect';

const ExperienceSection = styled.section`
  background-color: var(--bg);
  color: var(--text);
  text-align: left;
  padding: 120px 20px;
  position: relative;
  @media (max-width: 768px) {
    padding: 80px 15px;
  }

  @media (max-width: 480px) {
    padding: 60px 10px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 80px;
  text-align: center;
  letter-spacing: -0.03em;
  position: relative;
  display: inline-block;
  ${shineHover('linear-gradient(180deg, var(--text-hi) 0%, var(--text-hi) 200%)')}

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    border-radius: 2px;
    box-shadow: 0 0 14px var(--accent-glow);
  }
`;

const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

/* Riel vertical: pista tenue + relleno que avanza con el scroll */
const Rail = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 45px;
  width: 2px;
  z-index: 1;
  border-radius: 2px;
  background: linear-gradient(180deg, transparent 0%, var(--line-strong) 12%, var(--line-strong) 88%, transparent 100%);

  @media (max-width: 768px) {
    left: 20px;
  }

  @media (max-width: 480px) {
    left: 15px;
  }
`;

const RailFill = styled(motion.div)`
  position: absolute;
  inset: 0;
  transform-origin: 50% 0;
  border-radius: 2px;
  background: linear-gradient(180deg, transparent 0%, var(--accent) 10%, var(--accent) 100%);
  box-shadow: 0 0 12px var(--accent-glow);
`;

const ExperienceCardContainer = styled(motion.div)`
  display: flex;
  will-change: transform, opacity, filter;
  position: relative;
  width: 100%;
  padding-left: 100px;

  @media (max-width: 768px) {
    padding-left: 60px;
  }

  @media (max-width: 480px) {
    padding-left: 45px;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 36px;
  top: 30px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--bg);
  border: 3px solid var(--line-strong);
  z-index: 2;
  display: grid;
  place-items: center;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;

  ${ExperienceCardContainer}:hover & {
    transform: scale(1.2);
    border-color: var(--accent);
    box-shadow: 0 0 16px var(--accent-glow);
  }

  @media (max-width: 768px) {
    left: 11px;
    top: 25px;
  }

  @media (max-width: 480px) {
    left: 8px;
    top: 22px;
    width: 16px;
    height: 16px;
  }
`;

/* Núcleo que se enciende cuando la línea llega al punto */
const DotCore = styled(motion.span)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent-glow);
`;

const ExperienceCard = styled(motion.a)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  background: rgba(232, 234, 255, 0.025);
  border: 1px solid var(--line);
  padding: 35px 40px;
  border-radius: 24px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  position: relative;

  &:hover {
    transform: translateY(-5px);
    background: rgba(232, 234, 255, 0.045);
    border-color: var(--accent-glow);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px var(--accent-soft);
  }

  @media (max-width: 768px) {
    padding: 25px 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }

`;

const HeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
`;

const JobTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-hi);
  transition: color 0.3s ease;

  ${ExperienceCard}:hover & {
    color: var(--text-hi);
    text-shadow: 0 0 12px var(--accent-soft);
  }
`;

const Company = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-hi);
  padding: 4px 12px;
  background: var(--accent-soft);
  border-radius: 20px;
  border: 1px solid var(--line-strong);
`;

const JobDate = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 15px;
  margin-top: -5px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  
  ${ExperienceCard}:hover & {
    text-shadow: 0 0 10px var(--accent-soft);
  }
`;

const Description = styled.p`
  font-size: 1.05rem;
  color: var(--text-2);
  line-height: 1.7;
  transition: color 0.3s ease;

  ${ExperienceCard}:hover & {
    color: var(--text);
  }
`;

/* Cada experiencia reacciona a su propia posición en el viewport:
   entra desde abajo/izquierda con blur y se enfoca al acercarse al centro. */
const ExperienceItem = ({ experience, reduced }) => {
  const ref = useRef(null);

  const { scrollYProgress: enter } = useScroll({
    target: ref,
    offset: ['start 95%', 'start 60%'],
  });
  const { scrollYProgress: dotProgress } = useScroll({
    target: ref,
    offset: ['start 72%', 'start 55%'],
  });

  // al salir por arriba, la tarjeta se hunde y se apaga
  const { scrollYProgress: leave } = useScroll({
    target: ref,
    offset: ['end 38%', 'end 6%'],
  });
  const leaveSmooth = useSpring(leave, { stiffness: 110, damping: 26, mass: 0.4 });
  const outOpacity = useTransform(leaveSmooth, [0, 1], [1, 0.25]);
  const outScale = useTransform(leaveSmooth, [0, 1], [1, 0.94]);
  const outY = useTransform(leaveSmooth, [0, 1], [0, -36]);

  const smooth = useSpring(enter, { stiffness: 110, damping: 24, mass: 0.4 });
  const inOpacity = useTransform(smooth, [0, 1], [0, 1]);
  const inY = useTransform(smooth, [0, 1], [60, 0]);
  const x = useTransform(smooth, [0, 1], [-28, 0]);
  const inScale = useTransform(smooth, [0, 1], [0.96, 1]);
  const opacity = useTransform([inOpacity, outOpacity], ([a, b]) => a * b);
  const y = useTransform([inY, outY], ([a, b]) => a + b);
  const scale = useTransform([inScale, outScale], ([a, b]) => a * b);
  const blur = useTransform(smooth, [0, 1], [10, 0]);
  const filter = useTransform(blur, (v) => `blur(${v.toFixed(1)}px)`);

  const core = useSpring(dotProgress, { stiffness: 160, damping: 20 });
  const coreScale = useTransform(core, [0, 1], [0, 1]);

  const motionStyle = reduced ? undefined : { opacity, y, x, scale, filter };

  return (
    <ExperienceCardContainer ref={ref} style={motionStyle}>
      <TimelineDot>
        <DotCore style={{ scale: reduced ? 1 : coreScale }} />
      </TimelineDot>
      <ExperienceCard href={experience.link} target="_blank" rel="noopener noreferrer">
        <HeaderGroup>
          <JobTitle>{experience.jobTitle}</JobTitle>
          <Company>{experience.company}</Company>
        </HeaderGroup>
        {experience.date && <JobDate>{experience.date}</JobDate>}
        <Description>{experience.description}</Description>
      </ExperienceCard>
    </ExperienceCardContainer>
  );
};

const Experience = () => {
  const { t } = useTranslation();
  const experiences = t('jobs', { returnObjects: true });
  const reduced = useReducedMotion();

  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 62%', 'end 58%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.5 });

  return (
    <ExperienceSection>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {t('experienceTitle')}
        </Title>
        <ExperienceList ref={listRef}>
          <Rail aria-hidden="true">
            <RailFill style={{ scaleY: reduced ? 1 : fill }} />
          </Rail>
          {Array.isArray(experiences) &&
            experiences.map((experience, index) => (
              <ExperienceItem key={index} experience={experience} reduced={reduced} />
            ))}
        </ExperienceList>
      </ContentWrapper>
    </ExperienceSection>
  );
};

export default Experience;
