export const logoCells = [
  [1, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [3, 1],
  [2, 2],
] as const;

export type ScaledLogoPixel = {
  x: number;
  y: number;
  size: number;
  radius: number;
};

/** Scale the logo mark to fit a square canvas (favicon, app icon, etc.). */
export function getScaledLogoLayout(canvasSize: number): ScaledLogoPixel[] {
  const gap = Math.max(1, Math.round(canvasSize * 0.04));
  const cell = Math.round((canvasSize * 0.68 - gap * 3) / 4);
  const gridWidth = cell * 4 + gap * 3;
  const gridHeight = cell * 3 + gap * 2;
  const originX = (canvasSize - gridWidth) / 2;
  const originY = (canvasSize - gridHeight) / 2;

  return logoCells.map(([column, row]) => ({
    x: originX + column * (cell + gap),
    y: originY + row * (cell + gap),
    size: cell,
    radius: Math.max(1, cell * 0.26),
  }));
}
