import { writable } from 'svelte/store';
import { getMessage, setMessage } from './wsHelper';

let socket = null;
let WS = null;

const getSocket = () => {
    if (WS) return WS;
    WS = webSock();
    WS.init();
    return WS;
}

const webSock = () => {
    const tasks = writable([]);
    const content = writable({});
    const logEntry = writable([]);

    function init() {
        if (typeof WebSocket === undefined ) return;
        
        if(!socket) {
            const protocol = window && window.location.protocol === 'https' ? 'wss' : 'ws';
            const wsurl = `${protocol}://${window.location.host}`;
            socket = new WebSocket(wsurl);
            console.log('socket initialized')
        }
        
        socket.onmessage = ({data}) => {
            const result = getMessage(data);
            if (result.tasks) {
                tasks.set(result.tasks);
            } else if (result.content) {
                content.set(result.content);
            } else if (result.log) {
                logEntry.set(result.log);
            }
        }

        //socket.onopen = () => socket.send(setMessage('get my panties'));
    }

    let rtr = 0;
    let timeout: number;
    const send = data => {
        if (rtr > 100) {
            clearTimeout(timeout);
            rtr = 0;
            return;
        }
        if (socket.readyState === 1) {
            socket.send(setMessage(data));
            clearTimeout(timeout);
            rtr = 0;
        } else {
            rtr += 1;
            setTimeout(() => {
                console.log('retry-'+rtr, data);
                send(data);
            }, 200)
        }
    }

    const close = () => {
        console.log('close socket');
    }

    return { 
        close,
        init,
        send,
        content,
        logEntry,
        tasks
    }
}

export default getSocket;