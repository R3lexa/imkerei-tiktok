// Design tokens + motion helpers
// Принципы: impeccable (Persuade) · Emil Kowalski (custom easing, restraint)
// · Jakub Krehel (production polish) · Jhey Tompkins (delight)

import {interpolate, spring, Easing} from 'remotion';

export const C = {
  bg: '#100D07',
  surface: '#1C160B',
  surface2: '#221B0E',
  cream: '#FFF4DC',
  amber: '#FFB300',
  amberHi: '#FFD24A',
  amberLo: '#FF9E00',
  dark: '#14100A',
  muted: 'rgba(255,244,220,0.62)',
  faint: 'rgba(255,244,220,0.38)',
  hair: 'rgba(255,244,220,0.14)',
} as const;

export const FONT_DISPLAY = "'Archivo Black', 'Inter', sans-serif";
export const FONT_TEXT = "'Inter', sans-serif";

// Emil Kowalski: «Easing — самая важная часть любой анимации»
export const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

export const CLAMP = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;

/** Ввод элемента: fade + подъём, ease-out-quint. ~230ms @30fps */
export const enter = (frame: number, delay: number, dy = 26) => ({
  opacity: interpolate(frame, [delay, delay + 7], [0, 1], CLAMP),
  y: interpolate(frame, [delay, delay + 13], [dy, 0], {
    easing: Easing.bezier(...EASE_OUT),
    ...CLAMP,
  }),
});

/** Пружинный поп (карточки): scale 0.9→1 — никогда от 0 (Kowalski §2) */
export const springIn = (
  frame: number,
  fps: number,
  delay: number,
  damping = 15,
  stiffness = 170
) => {
  const s = spring({frame: frame - delay, fps, config: {damping, stiffness}});
  return {
    opacity: interpolate(frame - delay, [0, 6], [0, 1], CLAMP),
    scale: interpolate(s, [0, 1], [0.9, 1]),
    y: interpolate(s, [0, 1], [34, 0]),
  };
};

/** Счётчик цены: 0 → target, ease-out, формат «9,50» */
export const priceCount = (frame: number, delay: number, target: number) =>
  interpolate(frame, [delay, delay + 22], [0, target], {
    easing: Easing.bezier(...EASE_OUT),
    ...CLAMP,
  })
    .toFixed(2)
    .replace('.', ',');

/** Быстрый выход сцены: fade + лёгкий подъём (120–330ms) */
export const exit = (frame: number, duration: number, tail = 11) => ({
  opacity: interpolate(frame, [duration - tail, duration - 1], [1, 0], CLAMP),
  y: interpolate(frame, [duration - tail, duration], [0, -18], CLAMP),
});

/** Квадратичная Безье для полёта пчелы */
export const qbez = (
  t: number,
  p0: {x: number; y: number},
  p1: {x: number; y: number},
  p2: {x: number; y: number}
) => ({
  x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x,
  y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y,
});

export const fmtPrice = (v: string) => `${v} €`;
