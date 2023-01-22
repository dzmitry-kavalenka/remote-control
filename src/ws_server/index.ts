import { WebSocketServer } from 'ws';
import * as dotenv from 'dotenv';

import { useMouse } from './mouse';

import { BEFORE_UNDERSCORE_RX } from './utils';

dotenv.config();

const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ port: Number(PORT) });

wss.on('connection', (ws) => {
  ws.on('message', async (data) => {
    if (data) {
      const stringData = data.toString();
      const isValidCommand = BEFORE_UNDERSCORE_RX.test(stringData);

      if (!isValidCommand) return;

      const command = stringData.match(BEFORE_UNDERSCORE_RX)[0];

      if (command === 'mouse') {
        await useMouse(stringData, ws);
      }
    }
  });
});