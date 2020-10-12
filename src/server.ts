
// load env
import http from 'http';
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import WebSocket from 'ws';
import { getTasks, updateTask } from './WS/API/fileManipulation';
import { getMessage, setMessage } from './WS/wsHelper';
import { getContent, getThumbNailImage } from './WS/API/getContent';
import { log } from './logger';


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const { handler } = polka() // You can also use Express
	//.use(cachedImage)
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	
const server = http.createServer(handler);
const wss = new WebSocket.Server({server});
export let wsLog = _ => {};

wss.on('connection', ws => {
	const send = entry => ws.send(setMessage(entry));

	ws.on('message', async (json:string) => {
		const data = getMessage(json);

		if (data === 'getstories') {
			send({tasks: await getTasks()});
		}

		if (data.updateTask) {
			await updateTask(data.updateTask);
			send({tasks: await getTasks()}); 
		}

		if (data.getContent) {
			const { dirPath }  = data.getContent;
			const content = await getContent(decodeURI(dirPath));
			send({content});
		}

		if (data.getThumbnail) {
			const { dirPath, batch } = data.getThumbnail;
			if (dirPath.length && batch && batch.length) {
				const thumbs = await Promise.all(batch.map(async(img) =>  await getThumbNailImage(img, decodeURI(dirPath))));
				send({ content: { processed: { thumbs, message: '' } } });
			} else {
				send({ content: {processed: { message: 'error bad dir or img' } } });
			}
		}

		if (data.getCarousel) {
			log(['get carouse', data.getCarousel]);
		}
	});

	wsLog = log => {
		send({log})
	};

}) 

server.listen(PORT, () => {
	console.log('open on port', PORT);
});
