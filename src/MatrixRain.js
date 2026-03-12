import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  opacity: 0.8; /* Slight opacity to keep it subtle */
`;

const Canvas = styled.canvas`
  display: block;
`;

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

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
            ctx.shadowColor = '#22c55e';
            ctx.fillStyle = '#ffffff'; // White tip
        } else {
            ctx.shadowBlur = 2;
            ctx.shadowColor = '#22c55e';
            ctx.fillStyle = '#22c55e'; // Theme green
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

    const interval = setInterval(draw, 35); // Approx ~30 FPS

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <CanvasContainer>
      <Canvas ref={canvasRef} />
    </CanvasContainer>
  );
};

export default MatrixRain;
