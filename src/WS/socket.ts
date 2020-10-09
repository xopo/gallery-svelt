import { writable } from 'svelte/store';
import { getMessage, setMessage } from './wsHelper';

let socket;

const webSock = () => {
    
    const tasks = writable([]);
    const content = writable({});

    function init(addr = '') {
        if (typeof WebSocket === undefined ) return;
        
        if(!socket) {
            const protocol = window && window.location.protocol === 'https' ? 'wss' : 'ws';
            const wsurl = `${protocol}://${window.location.host}`;
            socket = new WebSocket(wsurl);
        }
        
        socket.onmessage = ({data}) => {
            const result = getMessage(data);
            if (result.tasks) {
                tasks.set(result.tasks);
            } else if (result.content) {
                content.set(result.content);
            }
        }

        //socket.onopen = () => socket.send(setMessage('get my panties'));
    }

    let rtr = 0;
    let timeout;
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
        getMessage,
        init,
        close,
        send,
        tasks,
        content
    }
}

export default webSock;