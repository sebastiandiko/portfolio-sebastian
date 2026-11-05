import React from 'react';
import styled, { keyframes } from 'styled-components';

/*
  Ilustraciones animadas (SVG) para cada servicio. Todo es vectorial, usa los
  tokens de color del sitio y se apaga con prefers-reduced-motion.
  Las animaciones de movimiento usan SMIL con `path` en línea (sin ids), así
  se pueden repetir varias copias de la tarjeta sin colisiones.
*/

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
const pulse = keyframes`
  0% { transform: scale(0.6); opacity: 0.7; }
  100% { transform: scale(1.9); opacity: 0; }
`;
const bounce = keyframes`
  0%, 60%, 100% { transform: translateY(0); opacity: 0.45; }
  30% { transform: translateY(-4px); opacity: 1; }
`;
const bubbleIn = keyframes`
  0%, 4% { opacity: 0; transform: translateY(8px); }
  12%, 88% { opacity: 1; transform: translateY(0); }
  96%, 100% { opacity: 0; transform: translateY(0); }
`;
const travel = keyframes`
  0%, 8% { transform: translateX(0); opacity: 0; }
  14% { opacity: 1; }
  38% { transform: translateX(90px); opacity: 1; }
  44% { transform: translateX(90px); }
  70% { transform: translateX(180px); opacity: 1; }
  78%, 100% { transform: translateX(180px); opacity: 0; }
`;
const fillBar = keyframes`
  0% { transform: scaleX(0.08); }
  80%, 100% { transform: scaleX(1); }
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  display: block;
  color: var(--accent);
  overflow: visible;

  .stroke {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .soft {
    stroke-opacity: 0.35;
  }
  .node {
    fill: var(--surface-2);
    stroke: currentColor;
    stroke-width: 1.5;
  }
  .fill {
    fill: currentColor;
  }
  .dim {
    fill: rgba(232, 234, 255, 0.16);
  }
  .glow {
    filter: drop-shadow(0 0 6px rgba(111, 227, 193, 0.7));
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
    }
    animateMotion {
      display: none;
    }
  }
`;

const Dot = ({ path, dur = '2.6s', begin = '0s', r = 3.2, rev = false }) => (
  <circle r={r} className="fill glow">
    <animateMotion
      path={path}
      dur={dur}
      begin={begin}
      repeatCount="indefinite"
      keyPoints={rev ? '1;0' : '0;1'}
      keyTimes="0;1"
      calcMode="linear"
    />
  </circle>
);

/* 1 — Automatización: un disparador se ramifica en pasos y llega al resultado */
export const AutomationVisual = () => {
  const p1 = 'M56 80 C86 80 90 42 118 42';
  const p2 = 'M56 80 C86 80 90 118 118 118';
  const p3 = 'M182 42 C216 42 220 80 262 80';
  const p4 = 'M182 118 C216 118 220 80 262 80';
  return (
    <Svg viewBox="0 0 320 160" aria-hidden="true">
      {[p1, p2, p3, p4].map((d) => (
        <path key={d} d={d} className="stroke soft" strokeDasharray="3 5" />
      ))}
      <circle cx="44" cy="80" r="13" className="node" />
      <path d="M40 80 h8 M44 76 v8" className="stroke" />
      <rect x="118" y="28" width="64" height="28" rx="9" className="node" />
      <rect x="128" y="38" width="30" height="3" rx="1.5" className="dim" />
      <rect x="128" y="45" width="18" height="3" rx="1.5" className="dim" />
      <rect x="118" y="104" width="64" height="28" rx="9" className="node" />
      <rect x="128" y="114" width="26" height="3" rx="1.5" className="dim" />
      <rect x="128" y="121" width="34" height="3" rx="1.5" className="dim" />
      <circle cx="276" cy="80" r="15" className="node glow" />
      <path d="M269 80 l5 5 l9 -10" className="stroke" />
      <Dot path={p1} begin="0s" />
      <Dot path={p2} begin="0.5s" />
      <Dot path={p3} begin="1.3s" />
      <Dot path={p4} begin="1.8s" />
    </Svg>
  );
};

/* 2 — Chatbots: conversación con indicador de escritura */
const ChatG = styled.g`
  .b1,
  .b2,
  .b3 {
    transform-box: fill-box;
    transform-origin: center;
    opacity: 0;
    animation: ${bubbleIn} 7s ease infinite;
  }
  .b2 { animation-delay: 0.9s; }
  .b3 { animation-delay: 1.9s; }
  .t circle {
    animation: ${bounce} 1.1s ease-in-out infinite;
    transform-box: fill-box;
  }
  .t circle:nth-child(2) { animation-delay: 0.15s; }
  .t circle:nth-child(3) { animation-delay: 0.3s; }
`;
export const ChatVisual = () => (
  <Svg viewBox="0 0 320 160" aria-hidden="true">
    <ChatG>
      <g className="b1">
        <rect x="150" y="14" width="150" height="34" rx="17" className="node" />
        <rect x="166" y="26" width="86" height="4" rx="2" className="dim" />
        <rect x="166" y="34" width="52" height="4" rx="2" className="dim" />
      </g>
      <g className="b2">
        <rect x="24" y="58" width="176" height="46" rx="17" className="node glow" />
        <circle cx="46" cy="81" r="9" className="fill" opacity="0.9" />
        <rect x="66" y="70" width="110" height="4" rx="2" className="dim" />
        <rect x="66" y="79" width="88" height="4" rx="2" className="dim" />
        <rect x="66" y="88" width="62" height="4" rx="2" className="dim" />
      </g>
      <g className="b3 t">
        <rect x="24" y="114" width="60" height="30" rx="15" className="node" />
        <circle cx="44" cy="129" r="3" className="fill" />
        <circle cx="54" cy="129" r="3" className="fill" />
        <circle cx="64" cy="129" r="3" className="fill" />
      </g>
    </ChatG>
  </Svg>
);

/* 3 — Agentes de IA: núcleo con herramientas en órbita */
const Orbit = styled.g`
  transform-origin: 160px 80px;
  animation: ${spin} 18s linear infinite;
`;
const OrbitRev = styled.g`
  transform-origin: 160px 80px;
  animation: ${spin} 28s linear infinite reverse;
`;
const Ping = styled.circle`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${pulse} 2.8s ease-out infinite;
`;
export const AgentVisual = () => (
  <Svg viewBox="0 0 320 160" aria-hidden="true">
    <circle cx="160" cy="80" r="58" className="stroke soft" strokeDasharray="2 6" />
    <circle cx="160" cy="80" r="38" className="stroke soft" />
    <OrbitRev>
      <rect x="196" y="60" width="18" height="18" rx="5" className="node" />
      <rect x="106" y="82" width="18" height="18" rx="5" className="node" />
    </OrbitRev>
    <Orbit>
      <circle cx="160" cy="22" r="7" className="node glow" />
      <circle cx="218" cy="80" r="5" className="fill" opacity="0.8" />
      <circle cx="160" cy="138" r="7" className="node" />
      <circle cx="102" cy="80" r="5" className="fill" opacity="0.8" />
    </Orbit>
    <Ping cx="160" cy="80" r="20" className="stroke" />
    <circle cx="160" cy="80" r="22" className="node glow" />
    <path d="M152 80 q0 -9 8 -9 q8 0 8 9 q0 9 -8 9 q-8 0 -8 -9 M160 71 v18 M154 76 h12 M154 84 h12" className="stroke" />
  </Svg>
);

/* 4 — Integraciones: un hub conecta sistemas y los datos viajan en ambos sentidos */
export const IntegrationVisual = () => {
  const lines = [
    'M138 68 L92 44',
    'M182 68 L228 44',
    'M138 92 L92 116',
    'M182 92 L228 116',
  ];
  return (
    <Svg viewBox="0 0 320 160" aria-hidden="true">
      {lines.map((d) => (
        <path key={d} d={d} className="stroke soft" strokeDasharray="3 5" />
      ))}
      <rect x="138" y="58" width="44" height="44" rx="12" className="node glow" />
      <path d="M152 80 h16 M160 72 v16" className="stroke" />
      {/* base de datos */}
      <rect x="56" y="26" width="38" height="38" rx="10" className="node" />
      <ellipse cx="75" cy="38" rx="9" ry="3.5" className="stroke" />
      <path d="M66 38 v12 c0 2 4 3.5 9 3.5 s9 -1.5 9 -3.5 v-12" className="stroke" />
      {/* pagos */}
      <rect x="226" y="26" width="38" height="38" rx="10" className="node" />
      <rect x="234" y="36" width="22" height="15" rx="3" className="stroke" />
      <path d="M234 41 h22" className="stroke" />
      {/* planilla */}
      <rect x="56" y="98" width="38" height="38" rx="10" className="node" />
      <path d="M65 110 h20 M65 117 h20 M65 124 h20 M75 106 v24" className="stroke soft" />
      {/* CRM */}
      <rect x="226" y="98" width="38" height="38" rx="10" className="node" />
      <circle cx="245" cy="112" r="5" className="stroke" />
      <path d="M236 128 c1 -6 5 -8 9 -8 s8 2 9 8" className="stroke" />
      {lines.map((d, i) => (
        <React.Fragment key={d}>
          <Dot path={d} begin={`${i * 0.45}s`} dur="2.2s" r={2.8} />
          <Dot path={d} begin={`${i * 0.45 + 1.1}s`} dur="2.2s" r={2.8} rev />
        </React.Fragment>
      ))}
    </Svg>
  );
};

/* 5 — Gestión ágil: una tarjeta recorre el tablero y la barra de entrega avanza */
const Mover = styled.g`
  animation: ${travel} 6s ease-in-out infinite;
`;
const Bar = styled.rect`
  transform-box: fill-box;
  transform-origin: left center;
  animation: ${fillBar} 6s ease-in-out infinite;
`;
export const AgileVisual = () => (
  <Svg viewBox="0 0 320 160" aria-hidden="true">
    {[24, 114, 204].map((x) => (
      <g key={x}>
        <rect x={x} y="14" width="92" height="104" rx="12" className="stroke soft" />
        <rect x={x + 10} y="24" width="34" height="4" rx="2" className="dim" />
      </g>
    ))}
    {/* tarjetas fijas */}
    <rect x="34" y="40" width="72" height="20" rx="6" className="node" opacity="0.6" />
    <rect x="34" y="66" width="72" height="20" rx="6" className="node" opacity="0.6" />
    <rect x="124" y="40" width="72" height="20" rx="6" className="node" opacity="0.6" />
    <rect x="214" y="40" width="72" height="20" rx="6" className="node" opacity="0.6" />
    <rect x="214" y="66" width="72" height="20" rx="6" className="node" opacity="0.6" />
    {/* tarjeta que avanza */}
    <Mover>
      <rect x="34" y="92" width="72" height="20" rx="6" className="node glow" />
      <rect x="42" y="99" width="30" height="3" rx="1.5" className="fill" />
      <rect x="42" y="105" width="20" height="3" rx="1.5" className="dim" />
    </Mover>
    {/* barra de progreso */}
    <rect x="24" y="134" width="272" height="6" rx="3" className="dim" />
    <Bar x="24" y="134" width="272" height="6" rx="3" className="fill" />
  </Svg>
);

/* Tarjeta final: anillos que laten alrededor de un avión de papel */
export const CtaVisual = () => (
  <Svg viewBox="0 0 320 160" aria-hidden="true">
    {[0, 0.9, 1.8].map((d) => (
      <Ping key={d} cx="160" cy="80" r="26" className="stroke" style={{ animationDelay: `${d}s` }} />
    ))}
    <circle cx="160" cy="80" r="30" className="node glow" />
    <path d="M148 82 L174 70 L166 94 L160 85 Z M160 85 L174 70" className="stroke" />
    <circle cx="70" cy="46" r="3" className="fill" opacity="0.5" />
    <circle cx="258" cy="118" r="4" className="fill" opacity="0.4" />
    <circle cx="246" cy="36" r="2.5" className="fill" opacity="0.6" />
    <circle cx="84" cy="124" r="2.5" className="fill" opacity="0.5" />
  </Svg>
);

export const serviceVisuals = [
  AutomationVisual,
  ChatVisual,
  AgentVisual,
  IntegrationVisual,
  AgileVisual,
];
