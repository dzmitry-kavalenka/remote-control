import { mouse, Point } from '@nut-tree/nut-js';

export const mouseUp = (offset: number, { x, y }: Point) =>
  mouse.setPosition({ x, y: y - offset });

export const mouseDown = (offset: number, { x, y }: Point) =>
  mouse.setPosition({ x, y: y + offset });

export const mouseLeft = (offset: number, { x, y }: Point) =>
  mouse.setPosition({ x: x - offset, y });

export const mouseRight = (offset: number, { x, y }: Point) =>
  mouse.setPosition({ x: x + offset, y });
