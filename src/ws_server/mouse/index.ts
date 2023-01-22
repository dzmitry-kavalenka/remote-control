import { mouse } from '@nut-tree/nut-js';
import { WebSocket } from 'ws';

import { BETWEEN_UNDERSCORE_AND_SPACE_RX, AFTER_SPACE_RX } from '../utils';

import * as mouseHandlers from './handlers';

const mouseCommands = {
  up: mouseHandlers.mouseUp,
  down: mouseHandlers.mouseDown,
  left: mouseHandlers.mouseLeft,
  right: mouseHandlers.mouseRight,
};

export const useMouse = async (action: string, ws: WebSocket) => {
  const isValidCommand = BETWEEN_UNDERSCORE_AND_SPACE_RX.test(action);

  if (!isValidCommand) return;

  const command = action.match(BETWEEN_UNDERSCORE_AND_SPACE_RX)[0];

  const currentPosition = await mouse.getPosition();

  if (Object.keys(mouseCommands).includes(command)) {
    if (AFTER_SPACE_RX.test(action)) {
      const offset = action.match(AFTER_SPACE_RX)[1];

      await mouseCommands[command as keyof typeof mouseCommands](
        Number(offset),
        currentPosition,
      );

      ws.send(`mouse_${command}_${offset}`);
    }
  }

  if (command === 'position') {
    ws.send(`mouse_position_${currentPosition.x},${currentPosition.y}`);
  }
};
