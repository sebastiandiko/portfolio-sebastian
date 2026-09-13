import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CanvasContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  will-change: opacity;
`;

const Canvas = styled.canvas`
  display: block;
`;

const MatrixRain = ({ style }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });

    const fontSize = 16;
    let columns = 0;
    let drops = [];

    // Make canvas full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const newColumns = Math.floor(canvas.width / fontSize);
      if (newColumns > columns) {
        for (let x = columns; x < newColumns; x++) {
          drops[x] = Math.random() * -100; // initialize new columns
        }
      }
      columns = newColumns;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters for the rain (programming symbols, hex code, generic)
    const chars = '01</>{}[];*=+-~^?#@!&%ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Drawing function
    const draw = () => {
      // Semi-transparent black to create the trailing/fading effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Ignore if drop is negative (delayed start)
        if (drops[i] < 0) {
            drops[i]++;
            continue;
        }

        const text = chars[Math.floor(Math.random() * chars.length)];

        // Random glow effect on tips of trails
        if (Math.random() > 0.98) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ffffff';
            ctx.fillStyle = '#ffffff'; // White tip
        } else {
            ctx.shadowBlur = 2;
            ctx.shadowColor = '#8a8a90';
            ctx.fillStyle = '#8a8a90'; // Monochrome rain
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        ctx.shadowBlur = 0; // Reset blur for performance

        // Reset drop to top randomly after it goes off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // Drive the rain off rAF (synced with the compositor/scroll frame)
    // instead of setInterval, and only while the canvas is actually
    // visible on screen — this is what was fighting the scroll thread
    // for main-thread time on every frame regardless of scroll position.
    const FRAME_INTERVAL = 1000 / 30; // ~30 FPS is plenty for this effect
    let rafId = null;
    let lastDrawTime = 0;
    let isVisible = true;

    const tick = (time) => {
      rafId = requestAnimationFrame(tick);
      if (!isVisible || document.hidden) return;
      if (time - lastDrawTime < FRAME_INTERVAL) return;
      lastDrawTime = time;
      draw();
    };
    rafId = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <CanvasContainer style={{ opacity: 0.8, ...style }}>
      <Canvas ref={canvasRef} />
    </CanvasContainer>
  );
};

export default MatrixRain;
