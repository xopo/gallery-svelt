<script lang='ts'>
    import { onDestroy, onMount } from 'svelte';
    import getSocket from '../WS/socket';
    import type { WebSock } from '../WS/types';
    import icons from '../WS/UI/emoji';
    
    let logs:Array<string> = [];
    let WS: WebSock;
    let subscription = () => {};
    let pin = icons.pin;
    
    onMount(() => {
        WS = getSocket();
        subscription = WS.logEntry.subscribe(data => {
            if (data !== logs[0]) {
                // last info on top, keep 100
                logs = [data, ...logs.slice(0, 100)];
            }
        });
    })

    $: entry = logs && logs.reduce((ac: string, log: string) => ac = `${ac}${log}`, '');

    const setPin = () => {
        const newPin = (pin === icons.pin ? icons.pushpin : icons.pin);
        console.log('set pin', newPin);
        pin = newPin;
    }

    onDestroy(subscription);
</script>
<style>
    .logs {
        background: white;
        border: 1px solid gray;
        position: fixed;
        bottom: 0;
        right: 0;
        width: 50%;
        height: 50px;
    }
    .logs.pinpush{
        height: 500px;
    }
    textarea {
        background: black;
        color: white;
        width: 100%;
        height: 100%;
    }
    .pin {
        display: flex;
        justify-content: flex-end;
        margin-right: 10px;
        cursor: pointer;
    }
    /* textarea:empty {
        display: none;
    } */
</style>
<div class="logs" class:pinpush={pin === icons.pushpin}>
    <div class="pin" on:click={setPin}>{pin}</div>
    <textarea value={entry}></textarea>
</div>