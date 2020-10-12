<script lang='ts'>
    export let pinSet: boolean = false;
    import { pinnedItem } from '../WS/UI/store';
    import icons from '../WS/UI/emoji';
    pinnedItem.subscribe(value => {
        console.log('pined svelte', value);
    })
    export let showUnpin;
    $: pin = pinSet ? 
        icons.pushpin : 
        (showUnpin ? icons.folder : '') ;

</script>
<style>
     .pin {
        display: flex;
        justify-content: flex-end;
        padding-right: 5px;
        cursor: pointer;
        height: 1.5em;
        overflow: hidden;
        width: 100px;
        margin-left: auto;
    }
</style>
<div class="pin">{pin}</div>
<slot></slot>