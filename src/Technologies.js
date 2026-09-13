import React, { useRef, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useAnimationFrame } from 'framer-motion';
import { FaReact, FaJs, FaGitAlt, FaProjectDiagram } from 'react-icons/fa';
import {
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiAmazonwebservices,
  SiPowerbi,
  SiGooglegemini,
  SiOpenai,
  SiLinear,
  SiAdobe,
} from 'react-icons/si';
import { DiTerminal, DiJava } from 'react-icons/di';
import { useTranslation } from 'react-i18next';
import shineHover from './shineEffect';
import knifeImg from './assets/swiss-knife.png';

const TechSection = styled.section`
  background-color: #0a0a0c;
  color: #f5f5f7;
  text-align: center;
  padding: 70px 20px 120px;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    padding: 50px 15px 80px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 60px;
  letter-spacing: -0.03em;
  display: inline-block;
  ${shineHover('linear-gradient(180deg, #ffffff 0%, #a1a1a6 100%)')}
`;

const MainRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  text-align: left;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const ambientDrift = keyframes`
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
`;

const KnifeColumn = styled.div`
  flex-shrink: 0;
  width: 300px;
  position: relative;
  perspective: 1000px;

  @media (max-width: 900px) {
    width: 220px;
  }

  @media (max-width: 480px) {
    width: 170px;
  }
`;

const AmbientGlow = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  width: 220%;
  height: 220%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 65%);
  filter: blur(10px);
  animation: ${ambientDrift} 7s ease-in-out infinite;
  pointer-events: none;
`;

const ContactShadow = styled.div`
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 24px;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, transparent 75%);
  border-radius: 50%;
  z-index: 1;
  pointer-events: none;
`;

const TiltInner = styled(motion.div)`
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
  will-change: transform;
`;

const KnifeImage = styled(motion.img)`
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5));
`;

const CarouselColumn = styled.div`
  flex: 1;
  width: 100%;
  max-width: 460px;
`;

const CarouselContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 480px;

  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    top: 0;
    background: linear-gradient(to bottom, #0a0a0c 0%, transparent 100%);
  }

  &::after {
    bottom: 0;
    background: linear-gradient(to top, #0a0a0c 0%, transparent 100%);
  }

  @media (max-width: 900px) {
    height: 380px;
  }

  @media (max-width: 480px) {
    height: 320px;
  }
`;

const TechTrack = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: grab;
  will-change: transform;

  &:active {
    cursor: grabbing;
  }
`;

const TechCard = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px 22px;
  border-radius: 18px;
  margin-bottom: 16px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateX(6px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 12px 35px rgba(255, 255, 255, 0.15);
  }

  h3 {
    font-size: 0.95rem;
    font-weight: 500;
    color: #a1a1a6;
    transition: color 0.4s ease;
  }

  svg {
    color: #86868b;
    font-size: 1.8rem;
    flex-shrink: 0;
    transition: all 0.4s ease;
  }

  &:hover h3 {
    color: #ffffff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }

  &:hover svg {
    color: #ffffff;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.4));
  }
`;

const IconGroup = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  flex-shrink: 0;
`;

const N8nIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.001 0l-4.14 2.19v9.117L4.14 13.26v4.618l3.72-1.968v-9.117l3.72-1.968v9.117l3.72-1.968V2.834L12.001 0zm0 10.74l4.14-2.19v-4.62l-4.14 2.19v4.62zm0 13.26l4.14-2.19v-9.117l3.72-1.968v-4.618l-3.72 1.968v9.117l-3.72 1.968v-9.117l-3.72 1.968v4.618l7.44 3.936z"/>
  </svg>
);

const Technologies = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [isMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const knifeParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rotateYValue, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateYValue.set(px * 20);
    rotateXValue.set(py * -20);
  };

  const handleMouseLeave = () => {
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  const trackRef = useRef(null);
  const trackY = useMotionValue(0);
  const setHeightRef = useRef(0);
  const isPausedRef = useRef(false);
  const isVisibleRef = useRef(false);
  const SCROLL_SPEED = 40; // px per second

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setHeightRef.current = trackRef.current.scrollHeight / 2;
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // The carousel used to animate forever, even while the section was
  // scrolled far out of view — wasted work stealing frame budget from
  // the scroll everywhere else on the page. Only run it while visible.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((t, delta) => {
    const setHeight = setHeightRef.current;
    if (!setHeight || !isVisibleRef.current) return;

    if (!isPausedRef.current) {
      trackY.set(trackY.get() - (delta / 1000) * SCROLL_SPEED);
    }

    const current = trackY.get();
    if (current <= -setHeight) {
      trackY.set(current + setHeight);
    } else if (current > 0) {
      trackY.set(current - setHeight);
    }
  });

  const techs = [
    { name: 'React', icon: <FaReact /> },
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'Python', icon: <SiPython /> },
    {
      name: 'SQL / NoSQL',
      icon: (
        <IconGroup>
          <SiPostgresql />
          <SiMongodb />
        </IconGroup>
      )
    },
    { name: 'Bash', icon: <DiTerminal /> },
    { name: 'Java', icon: <DiJava /> },
    { name: 'AWS', icon: <SiAmazonwebservices /> },
    { name: 'Power BI', icon: <SiPowerbi /> },
    { name: 'OpenAI', icon: <SiOpenai /> },
    { name: 'Gemini', icon: <SiGooglegemini /> },
    { name: 'n8n', icon: <N8nIcon /> },
    { name: 'Linear', icon: <SiLinear /> },
    { name: 'Adobe Experience Manager', icon: <SiAdobe /> },
    { name: 'Workfront', icon: <FaProjectDiagram /> }
  ];

  // We duplicate the array to achieve seamless infinite vertical scroll
  const duplicatedTechs = [...techs, ...techs];

  return (
    <TechSection ref={sectionRef}>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {t('technologiesTitle')}
        </Title>

        <MainRow>
          <KnifeColumn
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <AmbientGlow />
            <ContactShadow />
            <TiltInner style={{ rotateX, rotateY, y: knifeParallax }}>
              <KnifeImage src={knifeImg} alt="Navaja suiza — versatilidad técnica" />
            </TiltInner>
          </KnifeColumn>

          <CarouselColumn>
            <CarouselContainer>
              <TechTrack
                ref={trackRef}
                style={{ y: trackY }}
                drag={isMobile ? false : 'y'}
                dragMomentum={false}
                onPointerEnter={() => { isPausedRef.current = true; }}
                onPointerLeave={() => { isPausedRef.current = false; }}
                onDragStart={() => { isPausedRef.current = true; }}
                onDragEnd={() => { isPausedRef.current = false; }}
              >
                {duplicatedTechs.map((tech, index) => (
                  <TechCard key={index}>
                    {tech.icon}
                    <h3>{tech.name}</h3>
                  </TechCard>
                ))}
              </TechTrack>
            </CarouselContainer>
          </CarouselColumn>
        </MainRow>
      </ContentWrapper>
    </TechSection>
  );
};

export default Technologies;
