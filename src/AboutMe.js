import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import sebastianDefault from './assets/cutouts/sebastian-default.png';
import sebastianHover from './assets/cutouts/sebastian-hover.png';

const ambientDrift = keyframes`
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
`;

const AboutSection = styled.section`
  background-color: #000000;
  color: #f5f5f7;
  text-align: center;
  padding: 120px 20px;
  position: relative;
  overflow: hidden;

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
  position: relative;
  z-index: 2;
`;

const AboutLayout = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 30px;
  padding: 60px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.03);
  transition: border-color 0.4s ease;
  overflow: hidden;

  &:hover {
    border-color: rgba(255, 255, 255, 0.16);
  }

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 40px 20px;
    text-align: center;
    gap: 30px;
  }

  @media (max-width: 480px) {
    padding: 30px 15px;
    gap: 25px;
  }
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
  width: 320px;
  position: relative;
  perspective: 1000px;

  @media (max-width: 900px) {
    width: 240px;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    width: 190px;
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
  z-index: 3;
  pointer-events: none;
`;

const TiltInner = styled(motion.div)`
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
  will-change: transform;
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  position: relative;
  z-index: 2;
  filter: grayscale(1) contrast(1.2) brightness(0.96)
    drop-shadow(0 0 16px rgba(255, 255, 255, 0.18))
    drop-shadow(0 18px 26px rgba(0, 0, 0, 0.55));
  transition: opacity 0.5s ease;

  &.img-hover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  ${ImageContainer}:hover & {
    &.img-default { opacity: 0; }
    &.img-hover { opacity: 1; }
  }
`;

const TextContainer = styled.div`
  flex: 1;
  text-align: left;
  width: 100%;
`;

const Paragraph = styled(motion.p)`
  font-size: 1.15rem;
  line-height: 1.8;
  color: #a1a1a6;

  strong {
    color: #ffffff;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const AboutMe = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [isMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);

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

  return (
    <AboutSection ref={sectionRef}>
      <ContentWrapper>
        <AboutLayout>
          <ImageContainer
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <AmbientGlow />
            <ContactShadow />
            <TiltInner style={{ rotateX, rotateY, y: imageParallax }}>
              <StyledImage className="img-default" src={sebastianDefault} alt="Sebastian" />
              <StyledImage className="img-hover" src={sebastianHover} alt="Sebastian sonriendo" />
            </TiltInner>
          </ImageContainer>

          <TextContainer>
            <Paragraph dangerouslySetInnerHTML={{ __html: t('aboutDescription') }} />
          </TextContainer>
        </AboutLayout>
      </ContentWrapper>
    </AboutSection>
  );
};

export default AboutMe;
