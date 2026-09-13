import { css, keyframes } from 'styled-components';

// Subtle white glow that breathes in and out, used to draw the eye to
// primary contact actions (the floating button and the form's submit button).
const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.25);
  }
  50% {
    box-shadow: 0 0 24px 6px rgba(255, 255, 255, 0.35);
  }
`;

const pulseGlow = css`
  animation: ${glowPulse} 2.4s ease-in-out infinite;
`;

export default pulseGlow;
