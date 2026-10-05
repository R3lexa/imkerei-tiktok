// TikTok-видео для Imkerei Falman — 1080×1920, 30fps, 21s
// Формула HyperFrames: хук в первую секунду → ритм 2–3с → CTA
// Motion: Emil Kowalski (easing/prings) · Jakub (polish) · Jhey (delight)
import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import '@fontsource/archivo-black';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/900.css';
import {
  C,
  CLAMP,
  EASE_OUT,
  FONT_DISPLAY,
  FONT_TEXT,
  enter,
  exit,
  priceCount,
  springIn,
} from './theme';
import {
  BeeFlight,
  BeeHover,
  Grain,
  HexIcon,
  HoneycombBg,
  PinIcon,
  ProgressBar,
  Shine,
  TruckIcon,
  Vignette,
} from './components';

const shadow = '0 22px 60px rgba(0,0,0,0.45)';

/* ================= S1 — ХУК (0–72) ================= */
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const ex = exit(frame, durationInFrames);
  const w = (d: number) => enter(frame, d, 30);

  // зачёркивание SUPERMARKT
  const strike = interpolate(frame, [30, 44], [0, 100], {
    easing: Easing.bezier(...EASE_OUT),
    ...CLAMP,
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 26,
        transform: `translateY(${ex.y}px)`,
        opacity: ex.opacity,
      }}
    >
      <div
        style={{
          ...s(w(2)),
          fontFamily: FONT_TEXT,
          fontWeight: 700,
          fontSize: 46,
          letterSpacing: 14,
          color: C.muted,
          textTransform: 'uppercase',
        }}
      >
        Diesen
      </div>

      <div
        style={{
          ...s(w(5)),
          fontFamily: FONT_DISPLAY,
          fontSize: 210,
          lineHeight: 0.9,
          letterSpacing: -3,
          background: 'linear-gradient(180deg, #FFD24A 20%, #FF9E00 90%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: shadow,
          filter: 'drop-shadow(0 24px 50px rgba(255,158,0,0.28))',
        }}
      >
        HONIG
      </div>

      <div
        style={{
          ...s(w(9)),
          fontFamily: FONT_TEXT,
          fontWeight: 700,
          fontSize: 46,
          letterSpacing: 10,
          color: C.cream,
          textTransform: 'uppercase',
        }}
      >
        gibt&rsquo;s nicht im
      </div>

      <div style={{...s(w(12)), position: 'relative', marginTop: 6}}>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 104,
            color: C.cream,
            letterSpacing: -1,
            textShadow: shadow,
          }}
        >
          SUPERMARKT
        </div>
        {/* линия зачёркивания */}
        <div
          style={{
            position: 'absolute',
            top: '54%',
            left: '-2%',
            width: `${strike}%`,
            height: 12,
            borderRadius: 6,
            background: C.cream,
            transformOrigin: 'left',
          }}
        />
      </div>

      <BeeFlight
        from={{x: -140, y: 360}}
        ctrl={{x: 560, y: 210}}
        to={{x: 1230, y: 330}}
        start={8}
        dur={44}
        scale={1.05}
      />
    </AbsoluteFill>
  );
};

const s = (e: {opacity: number; y: number}) => ({
  opacity: e.opacity,
  transform: `translateY(${e.y}px)`,
});

/* ================= S2 — IMKER (72–195) ================= */
const Imker: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();
  const ex = exit(frame, durationInFrames);
  const pop = springIn(frame, fps, 26, 16, 150);
  const underline = interpolate(frame, [22, 38], [0, 100], {
    easing: Easing.bezier(...EASE_OUT),
    ...CLAMP,
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 34,
        opacity: ex.opacity,
        transform: `translateY(${ex.y}px)`,
      }}
    >
      <div style={{...s(enter(frame, 4))}}>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 118,
            lineHeight: 1.02,
            color: C.cream,
            textAlign: 'center',
            textShadow: shadow,
          }}
        >
          Direkt
          <br />
          vom Imker.
        </div>
      </div>

      <div style={{...s(enter(frame, 14)), position: 'relative'}}>
        <div
          style={{
            fontFamily: FONT_TEXT,
            fontWeight: 900,
            fontSize: 62,
            color: C.amberHi,
            letterSpacing: 1,
          }}
        >
          Aus Frechen.
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: -12,
            left: 0,
            width: `${underline}%`,
            height: 8,
            borderRadius: 4,
            background: 'linear-gradient(90deg, #FFD24A, #FF9E00)',
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* бейдж */}
      <div
        style={{
          opacity: pop.opacity,
          transform: `translateY(${pop.y}px) scale(${pop.scale})`,
          marginTop: 26,
          background: 'linear-gradient(135deg, #FFD24A, #FF9E00)',
          color: C.dark,
          fontFamily: FONT_TEXT,
          fontWeight: 900,
          fontSize: 44,
          padding: '26px 54px',
          borderRadius: 999,
          letterSpacing: 0.5,
          boxShadow: '0 18px 50px rgba(255,158,0,0.35)',
        }}
      >
        100% naturbelassen
      </div>
    </AbsoluteFill>
  );
};

/* ================= S3 — ПРОДУКТЫ (195–405) ================= */
type P = {name: string; desc: string; price: number; delay: number};
const PRODUCTS: P[] = [
  {name: 'BLÜTENHONIG', desc: 'mild & blumig', price: 9.5, delay: 40},
  {name: 'AKAZIENHONIG', desc: 'hell & zart', price: 14, delay: 58},
  {name: 'WABENHONIG', desc: 'direkt aus der Wabe', price: 18, delay: 76},
];

const ProductCard: React.FC<P> = ({name, desc, price, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = springIn(frame, fps, delay);
  return (
    <div
      style={{
        opacity: sp.opacity,
        transform: `translateY(${sp.y}px) scale(${sp.scale})`,
        width: 880,
        background: `linear-gradient(135deg, ${C.surface}, ${C.surface2})`,
        border: `2px solid ${C.hair}`,
        borderRadius: 30,
        padding: '34px 44px',
        display: 'flex',
        alignItems: 'center',
        gap: 34,
        boxShadow: '0 26px 60px rgba(0,0,0,0.38)',
      }}
    >
      <HexIcon size={64} />
      <div style={{flex: 1}}>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 47,
            color: C.cream,
            letterSpacing: -0.5,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: FONT_TEXT,
            fontWeight: 500,
            fontSize: 28,
            color: 'rgba(255,244,220,0.74)',
            marginTop: 8,
          }}
        >
          {desc}
        </div>
      </div>
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 56,
          fontVariantNumeric: 'tabular-nums',
          background: 'linear-gradient(180deg, #FFD24A, #FF9E00)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          whiteSpace: 'nowrap',
        }}
      >
        {priceCount(frame, delay + 14, price)} €
      </div>
    </div>
  );
};

const Products: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const ex = exit(frame, durationInFrames);
  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 30,
        opacity: ex.opacity,
        transform: `translateY(${ex.y}px)`,
      }}
    >
      <div
        style={{
          ...s(enter(frame, 4)),
          fontFamily: FONT_DISPLAY,
          fontSize: 82,
          textAlign: 'center',
          lineHeight: 1.05,
          textShadow: shadow,
          marginBottom: 24,
        }}
      >
        <span style={{color: C.cream}}>3 Sorten.</span>{' '}
        <span
          style={{
            background: 'linear-gradient(180deg, #FFD24A, #FF9E00)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Ein Imker.
        </span>
      </div>
      {PRODUCTS.map((p) => (
        <ProductCard key={p.name} {...p} />
      ))}
    </AbsoluteFill>
  );
};

/* ================= S4 — СЕРВИС (405–510) ================= */
const Service: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();
  const ex = exit(frame, durationInFrames);
  const rows = [
    {icon: <PinIcon />, text: 'Selbstabholung in Frechen', delay: 14},
    {icon: <TruckIcon />, text: 'Lieferung bis vor die Tür', delay: 30},
  ];
  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 36,
        opacity: ex.opacity,
        transform: `translateY(${ex.y}px)`,
      }}
    >
      <div
        style={{
          ...s(enter(frame, 4)),
          fontFamily: FONT_DISPLAY,
          fontSize: 78,
          color: C.cream,
          textAlign: 'center',
          textShadow: shadow,
          marginBottom: 20,
        }}
      >
        So bekommst
        <br />
        du ihn:
      </div>
      {rows.map((r) => {
        const sp = springIn(frame, fps, r.delay, 16, 140);
        return (
          <div
            key={r.text}
            style={{
              opacity: sp.opacity,
              transform: `translateY(${sp.y}px) scale(${sp.scale})`,
              width: 860,
              background: `linear-gradient(135deg, ${C.surface}, ${C.surface2})`,
              border: `2px solid ${C.hair}`,
              borderRadius: 28,
              padding: '36px 44px',
              display: 'flex',
              alignItems: 'center',
              gap: 36,
              boxShadow: '0 24px 55px rgba(0,0,0,0.35)',
            }}
          >
            {r.icon}
            <div
              style={{
                fontFamily: FONT_TEXT,
                fontWeight: 700,
                fontSize: 42,
                color: C.cream,
              }}
            >
              {r.text}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ================= S5 — АУТРО / CTA (510–630) ================= */
const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();
  const logo = springIn(frame, fps, 6, 15, 130);
  const pulse = spring({frame: frame - 24, fps, config: {damping: 12, stiffness: 120}});
  const pillScale = interpolate(pulse, [0, 1], [0.94, 1]);

  return (
    <AbsoluteFill
      style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}
    >
      {/* логотип-шестиугольник + пчела */}
      <div
        style={{
          opacity: logo.opacity,
          transform: `translateY(${logo.y}px) scale(${logo.scale})`,
          position: 'relative',
          width: 200,
          height: 200,
          marginBottom: 56,
        }}
      >
        <HexIcon size={200} />
        <div style={{position: 'absolute', top: 58, left: 44}}>
          <BeeHover x={56} y={44} scale={0.62} />
        </div>
      </div>

      <div
        style={{
          ...s(enter(frame, 14)),
          fontFamily: FONT_TEXT,
          fontWeight: 700,
          fontSize: 40,
          letterSpacing: 16,
          color: C.muted,
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        Imkerei
      </div>
      <div
        style={{
          ...s(enter(frame, 18)),
          fontFamily: FONT_DISPLAY,
          fontSize: 132,
          letterSpacing: 1,
          lineHeight: 1,
          marginBottom: 64,
          background: 'linear-gradient(180deg, #FFD24A 25%, #FF9E00 90%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          filter: 'drop-shadow(0 24px 50px rgba(255,158,0,0.25))',
        }}
      >
        FALMAN
      </div>

      <div
        style={{
          ...s(enter(frame, 26)),
          fontFamily: FONT_TEXT,
          fontWeight: 500,
          fontSize: 34,
          color: C.muted,
          marginBottom: 26,
        }}
      >
        Jetzt online bestellen:
      </div>

      {/* домен-пилюля с блеском */}
      <div
        style={{
          opacity: interpolate(frame - 30, [0, 7], [0, 1], CLAMP),
          transform: `scale(${pillScale})`,
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #FFD24A, #FF9E00)',
          color: C.dark,
          fontFamily: FONT_TEXT,
          fontWeight: 900,
          fontSize: 52,
          padding: '30px 62px',
          borderRadius: 999,
          letterSpacing: 0.5,
          boxShadow: '0 22px 60px rgba(255,158,0,0.4)',
        }}
      >
        imkerei-falman.de
        <Shine delay={44} />
      </div>

      <div
        style={{
          ...s(enter(frame, 40)),
          fontFamily: FONT_TEXT,
          fontWeight: 500,
          fontSize: 30,
          color: C.faint,
          marginTop: 34,
          letterSpacing: 2,
        }}
      >
        Hauptstraße 151 · 50226 Frechen
      </div>
    </AbsoluteFill>
  );
};

/* ================= КОРЕНЬ ================= */
export const TikTokVideo: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.bg, fontFamily: FONT_TEXT}}>
    <HoneycombBg />
    <ProgressBar />
    <Sequence durationInFrames={72}>
      <Hook />
    </Sequence>
    <Sequence from={72} durationInFrames={123}>
      <Imker />
    </Sequence>
    <Sequence from={195} durationInFrames={210}>
      <Products />
    </Sequence>
    <Sequence from={405} durationInFrames={105}>
      <Service />
    </Sequence>
    <Sequence from={510} durationInFrames={120}>
      <Outro />
    </Sequence>
    <Vignette />
    <Grain />
  </AbsoluteFill>
);
