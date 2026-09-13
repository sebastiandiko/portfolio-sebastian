import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import posterImg from './assets/video-poster.jpg';

const ringPulse = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.6); opacity: 0; }
`;

const VideoSection = styled.section`
  background-color: #000000;
  padding: 40px 10px 140px;
  position: relative;

  @media (max-width: 768px) {
    padding: 24px 8px 90px;
  }

  @media (max-width: 480px) {
    padding: 16px 0 70px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;

const Frame = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6);
  background: #0a0a0c;

  @media (max-width: 480px) {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(1) contrast(1.05) brightness(0.75);
  transition: filter 0.4s ease, transform 0.6s ease;

  ${Frame}:hover & {
    filter: grayscale(1) contrast(1.05) brightness(0.6);
    transform: scale(1.02);
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  background: #000000;
  transition: filter 0.5s ease;
  filter: ${(props) =>
    props.$isPlaying ? 'none' : 'grayscale(1) contrast(1.05) brightness(0.85)'};
`;

const PlayButtonWrap = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 84px;
  height: 84px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    width: 64px;
    height: 64px;
  }
`;

const Ring = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.8);
  animation: ${ringPulse} 2.2s ease-out infinite;
`;

const PlayCircle = styled.span`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #ffffff;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  transition: transform 0.25s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);

  svg {
    transform: translateX(2px);
  }

  ${PlayButtonWrap}:hover & {
    transform: scale(1.08);
  }
`;

const IntroVideo = () => {
  const { t } = useTranslation();
  const [playing, setPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setPlaying(true);
  };

  return (
    <VideoSection>
      <ContentWrapper>
        <Frame
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {playing ? (
            <Video
              ref={videoRef}
              $isPlaying={isPlaying}
              src="/videos/intro.mp4"
              poster={posterImg}
              controls
              autoPlay
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <>
              <Poster src={posterImg} alt="Sebastian Dikowiec" />
              <PlayButtonWrap onClick={handlePlay} aria-label={t('playVideo')}>
                <Ring />
                <PlayCircle>
                  <FaPlay />
                </PlayCircle>
              </PlayButtonWrap>
            </>
          )}
        </Frame>
      </ContentWrapper>
    </VideoSection>
  );
};

export default IntroVideo;
