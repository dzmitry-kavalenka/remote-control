import WebSocket from 'ws';
import { mouse, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';

export const printScreen = async (ws: WebSocket) => {
  const { x, y } = await mouse.getPosition();

  const { data, width, height } = await screen.grabRegion(
    new Region(x - 100, y - 100, 200, 200),
  );

  const jimp = new Jimp({ data, width, height }, (err: Error | null) => {
    if (err) {
      console.error(err);
    }
  });

  const base64 = await jimp.getBase64Async(Jimp.MIME_PNG);

  ws.send(`prnt_scrn ${base64.replace('data:image/png;base64,', '')}`);
};
