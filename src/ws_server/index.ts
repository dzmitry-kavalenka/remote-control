import WebSocket, { WebSocketServer } from 'ws';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ port: Number(PORT) });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});