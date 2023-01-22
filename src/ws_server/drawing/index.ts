import { mouse } from '@nut-tree/nut-js';
import { WebSocket } from 'ws';

import { AFTER_SPACE_RX, BETWEEN_UNDERSCORE_AND_SPACE_RX } from '../utils';
import { drawRectangle, drawCircle } from './handlers';

export const draw = async (action: string, ws: WebSocket) => {
  const isValidCommand = BETWEEN_UNDERSCORE_AND_SPACE_RX.test(action);
  if (!isValidCommand) return;

  const shape = action.match(BETWEEN_UNDERSCORE_AND_SPACE_RX)[0];
  const currentPosition = await mouse.getPosition();

  if (shape === 'circle') {
    if (AFTER_SPACE_RX.test(action)) {
      const radius = action.match(AFTER_SPACE_RX)[1];

      await drawCircle(Number(radius), currentPosition);
      ws.send(`draw_circle\t${radius}`);
    }
  }

  if (shape === 'square') {
    if (AFTER_SPACE_RX.test(action)) {
      const width = action.match(AFTER_SPACE_RX)[1];
      await drawRectangle(Number(width), Number(width), currentPosition);
      ws.send(`draw_square\t${width}`);
    }
  }

  if (shape === 'rectangle') {
    if (AFTER_SPACE_RX.test(action)) {
      const sides = action.match(AFTER_SPACE_RX)[1].split(' ');

      if (sides.length === 2) {
        const width = Number(sides[0]);
        const length = Number(sides[1]);

        await drawRectangle(width, length, currentPosition);
        ws.send(`draw_rectangle\t${width}\t${length}`);
      }
    }
  }
};
