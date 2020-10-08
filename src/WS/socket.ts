import { writable } from 'svelte/store';
import { getMessage, setMessage } from './wsHelper';

let socket;

const webSock = () => {
    
    const tasks = writable([]);
    const content = writable({});

    function init(addr = '') {
        console.log('init')
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

    const send = data => {
        if (socket.readyState === 1) {
            socket.send(setMessage(data));
        } else {
            setTimeout(() => {
                console.log('retry', data);
                send(data);
            }, 100)
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