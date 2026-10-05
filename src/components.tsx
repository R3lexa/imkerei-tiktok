// Визуальные компоненты: пчела, соты, зерно, виньетка, прогресс, иконки
import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import {C, CLAMP, qbez} from './theme';

/* ---------- Пчела ---------- */
export const Bee: React.FC<{
  x: number;
  y: number;
  scale?: number;
  rot?: number;
  wing?: number; // скорость взмаха
}> = ({x, y, scale = 1, rot = 0, wing = 1.15}) => {
  const frame = useCurrentFrame();
  const flap = 0.28 + Math.abs(Math.sin(frame * wing)) * 0.72;
  return (
    <svg
      width={132 * scale}
      height={110 * scale}
      viewBox="0 0 120 100"
      style={{
        position: 'absolute',
        left: x - 66 * scale,
        top: y - 55 * scale,
        transform: `rotate(${rot}deg)`,
        filter: 'drop-shadow(0 14px 22px rgba(0,0,0,0.45))',
      }}
    >
      {/* крылья */}
      <g style={{transform: `scaleY(${flap})`, transformOrigin: '48px 42px'}}>
        <ellipse cx="40" cy="30" rx="17" ry="22" fill="rgba(255,246,224,0.28)" />
        <ellipse cx="40" cy="30" rx="17" ry="22" fill="none" stroke="rgba(255,246,224,0.55)" strokeWidth="2" />
      </g>
      <g style={{transform: `scaleY(${flap * 0.92})`, transformOrigin: '68px 42px'}}>
        <ellipse cx="64" cy="28" rx="15" ry="20" fill="rgba(255,246,224,0.22)" />
        <ellipse cx="64" cy="28" rx="15" ry="20" fill="none" stroke="rgba(255,246,224,0.45)" strokeWidth="2" />
      </g>
      {/* тельце */}
      <ellipse cx="52" cy="58" rx="32" ry="22" fill="#FFC24B" stroke="#14100A" strokeWidth="3" />
      {/* полоски (клип по телу) */}
      <clipPath id="beeBody">
        <ellipse cx="52" cy="58" rx="30" ry="20" />
      </clipPath>
      <g clipPath="url(#beeBody)">
        <rect x="40" y="30" width="9" height="56" fill="#14100A" />
        <rect x="56" y="30" width="9" height="56" fill="#14100A" />
        <rect x="72" y="30" width="9" height="56" fill="#14100A" />
      </g>
      {/* головка */}
      <circle cx="88" cy="52" r="14" fill="#1A150C" />
      <circle cx="92" cy="48" r="3.2" fill="#FFF4DC" />
      {/* усики */}
      <path d="M92 40 Q96 28 104 24" fill="none" stroke="#1A150C" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M86 39 Q86 26 78 20" fill="none" stroke="#1A150C" strokeWidth="2.6" strokeLinecap="round" />
      {/* жало */}
      <polygon points="21,58 8,54 21,62" fill="#1A150C" />
    </svg>
  );
};

/** Полёт по кривой + наклон по касательной */
export const BeeFlight: React.FC<{
  from: {x: number; y: number};
  ctrl: {x: number; y: number};
  to: {x: number; y: number};
  start: number;
  dur: number;
  scale?: number;
}> = ({from, ctrl, to, start, dur, scale = 1}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, Math.min(1, (frame - start) / dur));
  if (t <= 0 || t >= 1) return null;
  const p = qbez(t, from, ctrl, to);
  const p2 = qbez(Math.min(1, t + 0.02), from, ctrl, to);
  const rot = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
  const bob = Math.sin(frame / 3.2) * 8;
  return <Bee x={p.x} y={p.y + bob} scale={scale} rot={rot * 0.35} />;
};

/** Пчела, парящая на месте (аутро) */
export const BeeHover: React.FC<{x: number; y: number; scale?: number}> = ({x, y, scale = 1}) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame / 7) * 14;
  const rot = Math.sin(frame / 11) * 6;
  return <Bee x={x} y={y + bob} scale={scale} rot={rot} wing={0.9} />;
};

/* ---------- Фон: соты (медленный дрейф) ---------- */
export const HoneycombBg: React.FC = () => {
  const frame = useCurrentFrame();
  const dx = -((frame * 0.22) % 124);
  const dy = -((frame * 0.1) % 108);
  return (
    <AbsoluteFill style={{opacity: 0.85}}>
      <svg width="1080" height="1920" style={{position: 'absolute'}}>
        <defs>
          <pattern id="hex" width="124" height="108" patternUnits="userSpaceOnUse" x={dx} y={dy}>
            <path
              d="M62 3 L119 34 L119 74 L62 105 L5 74 L5 34 Z"
              fill="none"
              stroke="rgba(255,179,0,0.055)"
              strokeWidth="2"
            />
          </pattern>
        </defs>
        <rect x="-124" y="-108" width="1328" height="2136" fill="url(#hex)" />
      </svg>
      {/* тёплое свечение сверху */}
      <div
        style={{
          position: 'absolute',
          top: -300,
          left: -200,
          right: -200,
          height: 900,
          background:
            'radial-gradient(ellipse 50% 45% at 50% 40%, rgba(255,158,0,0.13), transparent 70%)',
        }}
      />
    </AbsoluteFill>
  );
};

/* ---------- Плёночное зерно (статичный noise.png) ---------- */
export const Grain: React.FC = () => (
  <Img
    src={staticFile('noise.png')}
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.09,
      mixBlendMode: 'overlay',
      pointerEvents: 'none',
    }}
  />
);

/* ---------- Виньетка ---------- */
export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(ellipse 62% 55% at 50% 48%, transparent 55%, rgba(0,0,0,0.42) 100%)',
      pointerEvents: 'none',
    }}
  />
);

/* ---------- Прогресс-бар (глобальный кадр) ---------- */
export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 5,
        background: 'linear-gradient(90deg, #FFD24A, #FF9E00)',
        transform: `scaleX(${frame / durationInFrames})`,
        transformOrigin: 'left',
        zIndex: 60,
      }}
    />
  );
};

/* ---------- Иконки (stroke, амбер) ---------- */
export const HexIcon: React.FC<{size?: number}> = ({size = 56}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <defs>
      <linearGradient id="hexg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFD24A" />
        <stop offset="1" stopColor="#FF9E00" />
      </linearGradient>
    </defs>
    <path
      d="M32 3 L58 17.5 L58 46.5 L32 61 L6 46.5 L6 17.5 Z"
      fill="url(#hexg)"
      stroke="rgba(255,244,220,0.25)"
      strokeWidth="2"
    />
    <path
      d="M32 16 L45 23.5 L45 38.5 L32 46 L19 38.5 L19 23.5 Z"
      fill="none"
      stroke="rgba(20,16,10,0.55)"
      strokeWidth="3"
    />
  </svg>
);

export const PinIcon: React.FC<{size?: number}> = ({size = 52}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path
      d="M32 5 C19 5 10 15 10 26 c0 13 22 33 22 33 s22-20 22-33 C54 15 45 5 32 5 Z"
      stroke="#FFB300"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <circle cx="32" cy="26" r="8" stroke="#FFB300" strokeWidth="4" />
  </svg>
);

export const TruckIcon: React.FC<{size?: number}> = ({size = 52}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <rect x="4" y="20" width="30" height="24" rx="4" stroke="#FFB300" strokeWidth="4" />
    <path d="M34 28 h10 l9 9 v7 h-19 z" stroke="#FFB300" strokeWidth="4" strokeLinejoin="round" />
    <circle cx="16" cy="48" r="6" stroke="#FFB300" strokeWidth="4" />
    <circle cx="46" cy="48" r="6" stroke="#FFB300" strokeWidth="4" />
  </svg>
);

/* ---------- Блеск по пилюле (shine sweep) ---------- */
export const Shine: React.FC<{delay: number; w?: number}> = ({delay, w = 220}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [delay, delay + 14], [-w, 340], {
    easing: Easing.bezier(0.33, 1, 0.68, 1),
    ...CLAMP,
  });
  if (x <= -w) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: x,
        width: w * 0.5,
        transform: 'skewX(-18deg)',
        background:
          'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
        borderRadius: 999,
      }}
    />
  );
};
