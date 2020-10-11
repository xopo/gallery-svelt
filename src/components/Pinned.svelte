<script lang='ts'>
    export let viewFolders: boolean = false;
    import { pinnedItem } from '../WS/UI/store';
    import icons from '../WS/UI/emoji';
    pinnedItem.subscribe(value => {
        console.log('pined svelte', value);
    })
    $: pin = viewFolders ? icons.pushpin : '' ;

</script>
<style>
     .pin {
        display: flex;
        justify-content: flex-end;
        margin-right: 10px;
        cursor: pointer;
        height: 1em;
    }
</style>
<div class="pin">{pin}</div>
<slot></slot>