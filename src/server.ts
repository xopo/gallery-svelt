import http from 'http';
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import WebSocket from 'ws';
import { getTasks, updateTask } from './WS/API/fileManipulation';
import { getMessage, setMessage } from './WS/wsHelper';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const { handler } = polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	
const server = http.createServer(handler);
const wss = new WebSocket.Server({server});

wss.on('connection', ws => {
	ws.on('message', async (json:string) => {
		const data = getMessage(json);

		if (data === 'getstories') {
			ws.send(setMessage({tasks: await getTasks()}));
		}

		if (data.updateTask) {
			await updateTask(data.updateTask);
			ws.send(setMessage({tasks: await getTasks()})); 
		}

	})
}) 

server.listen(PORT, () => {
	console.log('open on port', PORT);
});
