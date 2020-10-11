<script lang='ts'>
    import { onDestroy, onMount } from 'svelte';
    import getSocket from '../WS/socket';
    import type { WebSock } from '../WS/types';
    import icons from '../WS/UI/emoji';
    
    let logs:Array<string> = [];
    let WS: WebSock;
    let subscription = () => {};
    let pin = '';
    
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
        const newPin = pin === icons.pushpin ? '' : icons.pushpin;
        pin = newPin;
    }

    onDestroy(subscription);
</script>
<style>
    textarea {
        background: black;
        color: white;
        width: 100%;
        height: 100%;
        font-size: .5em;
    }
    textarea.large:hover {
        font-size: .8em;
    }
</style>
<textarea 
    class:large={pin}
    readonly value={entry} 
    on:click|stopPropagation
></textarea>
