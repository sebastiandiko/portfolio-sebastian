import { css } from 'styled-components';

// Delicate one-pass shine sweep across text on hover. Resting state looks
// identical to a normal gradient-clipped title; nothing tracks the cursor.
const shineHover = (baseGradient = 'linear-gradient(180deg, #ffffff 0%, #a1a1a6 100%)') => css`
  background-image:
    linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.9) 50%, transparent 65%),
    ${baseGradient};
  background-size: 250% 100%, 100% 100%;
  background-position: -120% 0, 0 0;
  background-repeat: no-repeat;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  transition: background-position 1s ease;
  cursor: default;

  &:hover {
    background-position: 220% 0, 0 0;
  }
`;

export default shineHover;
