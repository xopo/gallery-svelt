<script lang='ts'>
    export let pinSet: boolean = false;
    import { pinnedItem } from '../WS/UI/store';
    import icons from '../WS/UI/emoji';
    pinnedItem.subscribe(value => {
        console.log('pined svelte', value);
    })
    $: pin = pinSet ? icons.pushpin : '' ;

</script>
<style>
     .pin {
        display: flex;
        justify-content: flex-end;
        margin-right: 10px;
        cursor: pointer;
        height: 1.5em;
        overflow: hidden;
    }
</style>
<div class="pin">{pin}</div>
<slot></slot>