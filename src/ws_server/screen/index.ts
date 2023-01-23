import WebSocket from 'ws';
import { mouse, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';

export const printScreen = async (ws: WebSocket) => {
  const { x, y } = await mouse.getPosition();

  const screenshot = await screen.grabRegion(new Region(x, y, 100, 100));
  console.log(screenshot.data);

  const jimp = new Jimp(screenshot.data, (err: any) => {
    if (err) {
      console.error(err);
    }
  });

  const base64 = await jimp.getBase64Async('image/png');

  console.log({ base64 });

  ws.send(`prnt_scrn ${base64}`);
};
