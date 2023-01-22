import { mouse, Point, right, straightTo } from '@nut-tree/nut-js';

export const drawRectangle = async (a: number, b: number, { x, y }: Point) => {
  await mouse.drag(straightTo(new Point(x + a, y)));
  await mouse.drag(straightTo(new Point(x + a, y + b)));
  await mouse.drag(straightTo(new Point(x, y + b)));
  await mouse.drag(straightTo(new Point(x, y)));
};

export const drawCircle = async (r: number, { x, y }: Point) => {
  await mouse.move(right(r));

  const steps = 100;
  for (let i = 0; i <= steps; i++) {
    const phase = 2 * Math.PI * i;
    const newX =  x + r * Math.cos(phase / steps);
    const newY = y + r * Math.sin(phase / steps);

    mouse.drag([{ x: newX, y: newY }]);
  }
};
