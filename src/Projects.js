import React, { useEffect, useMemo, useState, createRef } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useScroll } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import shineHover from './shineEffect';
import toqqenImg from './assets/toQQen.webp';
import pp1 from './assets/etl.png';
import getpassImg from './assets/getpass.svg';
import estebandikoImg from './assets/estebandiko.webp';
import sftdevelopmentImg from './assets/sftdevelopment.webp';
import vencemioImg from './assets/vencemio.webp';

const ProjectSection = styled.section`
  background-color: #000000;
  color: #f5f5f7;
  padding: 120px 20px;
  position: relative;
  /* clip (no hidden): hidden would turn the section into a scroll
     container and break the sticky stacking of the cards. */
  overflow: clip;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 120px;
  text-align: center;
  letter-spacing: -0.03em;
  position: relative;
  display: inline-block;
  ${shineHover('linear-gradient(180deg, #ffffff 0%, #ffffff 200%)')}

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: #ffffff;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22vh;
  width: 100%;
  padding-bottom: 8vh;

  @media (max-width: 968px) {
    gap: 80px;
    padding-bottom: 0;
  }

  @media (max-width: 480px) {
    gap: 60px;
  }
`;

/* Desktop: each card sticks near the top and the next one slides over it,
   building a deck. Mobile cards are taller than the viewport, so there they
   stay as a normal flowing list. */
const ProjectItem = styled(motion.div)`
  width: 100%;
  transform-origin: 50% 0%;
  will-change: transform;

  @media (min-width: 969px) {
    position: sticky;
    top: calc(96px + var(--stack-i, 0) * 26px);
  }
`;

const TiltWrapper = styled.div`
  width: 100%;
  position: relative;

  @media (hover: hover) and (pointer: fine) {
    perspective: 1200px;
  }
`;

const TiltInner = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 60px;
  flex-direction: ${props => props.$reverse ? 'row-reverse' : 'row'};
  padding: 40px;
  border-radius: 24px;
  overflow: hidden;
  /* Opaque so stacked cards fully cover the ones beneath */
  background: #0b0b0c;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 -24px 60px rgba(0,0,0,0.9), 0 20px 50px rgba(0,0,0,0.5);
  cursor: pointer;
  will-change: transform;
  transition: border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;

  @media (hover: hover) and (pointer: fine) {
    transform-style: preserve-3d;
  }

  /* Tint overlay, shared by the whole card */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.15);
    z-index: 1;
    transition: all 0.5s ease;
    mix-blend-mode: color;
    pointer-events: none;
  }

  &:hover::before {
    background: rgba(255, 255, 255, 0);
  }

  &:hover {
    box-shadow: 0 30px 60px rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.35);
    background: #111113;
  }

  @media (max-width: 968px) {
    flex-direction: column;
    padding: 24px;
    gap: 30px;
    cursor: default;
  }

  @media (max-width: 480px) {
    padding: 18px;
    gap: 20px;
  }
`;

const ImageBox = styled.div`
  flex: 1.2;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
`;

const TiltCard = ({ children, reverse, onClick }) => {
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const opacity = useSpring(0, { stiffness: 300, damping: 30 });

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [0, 1], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-7deg", "7deg"]);

  const glareX = useTransform(mouseXSpring, [0, 1], [0, 100]);
  const glareY = useTransform(mouseYSpring, [0, 1], [0, 100]);
  
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)`;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 968px)');
    const updateMobileState = () => setIsMobile(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener('change', updateMobileState);
    return () => mediaQuery.removeEventListener('change', updateMobileState);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
    opacity.set(1);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0.5);
    y.set(0.5);
    opacity.set(0);
  };

  return (
    <TiltWrapper
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
    >
      <TiltInner $reverse={reverse} onClick={onClick} style={isMobile ? {} : { rotateX, rotateY }}>
        {children}
        {!isMobile && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: glareBackground,
              opacity,
              pointerEvents: 'none',
              zIndex: 10,
              mixBlendMode: 'overlay'
            }}
          />
        )}
      </TiltInner>
    </TiltWrapper>
  );
};

const StackCard = ({ index, nextRef, innerRef, children }) => {
  // Progress of the NEXT card travelling up to its stuck position: while it
  // slides over this one, this card recedes (scales down and dims).
  const { scrollYProgress } = useScroll({
    target: nextRef,
    offset: ['start end', 'start 30%'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const dim = useTransform(scrollYProgress, [0, 1], [1, 0.45]);
  const filter = useMotionTemplate`brightness(${dim})`;

  return (
    <ProjectItem
      ref={innerRef}
      style={{ '--stack-i': index, scale: nextRef ? scale : 1, filter: nextRef ? filter : 'none' }}
    >
      {children}
    </ProjectItem>
  );
};

const ProjectImage = styled(motion.img)`
  width: 100%;
  aspect-ratio: 16 / 10;
  height: auto;
  object-fit: cover;
  display: block;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s ease;
  filter: grayscale(80%) contrast(1.1);

  ${TiltInner}:hover & {
    transform: scale(1.05);
    filter: grayscale(0%) contrast(1);
  }

  @media (max-width: 968px) {
    object-fit: contain;
    filter: grayscale(10%) contrast(1);
    padding: 8px;
    background: #0a0a0a;
  }
`;

const InfoContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  position: relative;
`;

const ProjectTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 25px;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const DescriptionBox = styled.div`
  margin-bottom: 35px;
  position: relative;

  p {
    font-size: 1.05rem;
    line-height: 1.7;
    color: #a1a1a6;
    margin: 0;
  }

  @media (max-width: 480px) {
    margin-bottom: 25px;

    p {
      font-size: 0.95rem;
      line-height: 1.6;
    }
  }
`;

const LinkButton = styled(motion.a)`
  background: #ffffff;
  color: #000000;
  padding: 12px 28px;
  border-radius: 8px;
  border: 1px solid #ffffff;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
`;

const images = [estebandikoImg, sftdevelopmentImg, getpassImg, vencemioImg, pp1, toqqenImg];
const links = [
  'https://www.estebandiko.com',
  'https://sftdevelopment.com/',
  'https://www.getpass.com.ar',
  'https://github.com/sebastiandiko/vencemio-mobile.git',
  'https://github.com/sebastiandiko/ETL-con-Python-y-SQL',
  'git@github.com:sebastiandiko/toqqen.git',
];

const Projects = () => {
  const { t, i18n } = useTranslation();
  const projects = t('projects', { returnObjects: true, lng: i18n.language });
  const count = Array.isArray(projects) ? projects.length : 0;
  const cardRefs = useMemo(() => Array.from({ length: count }, () => createRef()), [count]);

  return (
    <ProjectSection id="projects" key={i18n.language}>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {t('projectsTitle')}
        </Title>
        <ProjectContainer>
          {Array.isArray(projects) && projects.map((project, index) => {
            const isReverse = index % 2 !== 0;
            const openProject = () => {
              if (links[index]) {
                window.open(links[index], '_blank', 'noopener,noreferrer');
              }
            };

            return (
              <StackCard
                key={index}
                index={index}
                innerRef={cardRefs[index]}
                nextRef={cardRefs[index + 1]}
              >
                <TiltCard reverse={isReverse} onClick={openProject}>
                  <ImageBox>
                    <ProjectImage
                      src={images[index]}
                      alt={project.title}
                      style={index === 2 ? { objectFit: 'contain', padding: '50px', backgroundColor: '#000000' } : {}}
                    />
                  </ImageBox>

                  <InfoContainer>
                    <ProjectTitle>{project.title}</ProjectTitle>

                    <DescriptionBox>
                      <p>{project.description}</p>
                    </DescriptionBox>

                    {links[index] && (
                      <LinkButton
                        href={links[index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t('linkButton')}
                      </LinkButton>
                    )}
                  </InfoContainer>
                </TiltCard>
              </StackCard>
            );
          })}
        </ProjectContainer>
      </ContentWrapper>
    </ProjectSection>
  );
};

export default Projects;
