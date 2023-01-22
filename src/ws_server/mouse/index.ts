import { down, left, mouse, right, up } from '@nut-tree/nut-js';
import { WebSocket } from 'ws';

import { BETWEEN_UNDERSCORE_AND_SPACE_RX, AFTER_SPACE_RX } from '../utils';

const mouseCommands = {
  up: up,
  down: down,
  left: left,
  right: right,
};

export const useMouse = async (action: string, ws: WebSocket) => {
  const isValidCommand = BETWEEN_UNDERSCORE_AND_SPACE_RX.test(action);

  if (!isValidCommand) return;

  const command = action.match(BETWEEN_UNDERSCORE_AND_SPACE_RX)[0];

  const currentPosition = await mouse.getPosition();

  if (Object.keys(mouseCommands).includes(command)) {
    if (AFTER_SPACE_RX.test(action)) {
      const offset = action.match(AFTER_SPACE_RX)[1];

      mouse.move(mouseCommands[command as keyof typeof mouseCommands](Number(offset)));

      ws.send(`mouse_${command}\t${offset}`);
    }
  }

  if (command === 'position') {
    ws.send(`mouse_position\t${currentPosition.x},${currentPosition.y}`);
  }
};
