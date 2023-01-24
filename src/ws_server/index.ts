import { WebSocketServer } from 'ws';
import * as dotenv from 'dotenv';

import { httpServer } from '../http_server';

import { BEFORE_UNDERSCORE_RX } from './utils';
import { useMouse } from './mouse';
import { draw } from './drawing';
import { printScreen } from './screen';

dotenv.config();

const PORT = process.env.PORT || 8080;

export const wss = new WebSocketServer({ port: Number(PORT) });

wss.on('connection', (ws) => {
  console.log(`Websocket server running on ws://localhost:${PORT}`);

  ws.on('message', async (data) => {
    if (data) {
      const stringData = data.toString();
      const isValidCommand = BEFORE_UNDERSCORE_RX.test(stringData);

      if (!isValidCommand) return;

      const command = stringData.match(BEFORE_UNDERSCORE_RX)[0];

      if (stringData === 'prnt_scrn') {
        await printScreen(ws);
      }

      if (command === 'mouse') {
        await useMouse(stringData, ws);
      }

      if (command === 'draw') {
        await draw(stringData, ws);
      }
    }
  });
});

wss.on('close', () => {
  process.exit();
});

process.on('SIGINT', () => {
  wss.close();
  httpServer.close();

  process.exit();
});
