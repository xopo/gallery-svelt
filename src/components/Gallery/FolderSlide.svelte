<script lang='ts'>
    export let folders: Array<string>;
    import Pinned from '../Pinned.svelte';
    import icons from '../../WS/UI/emoji';
    import { pinnedItem, pushPinFolder} from '../../WS/UI/store';
    import type { SelectedPin } from '../../WS/types';

    export let history: Array<string>;
    export let gotToFolder: (s :string)=>void;
    
    let viewFolders:boolean;
    
    pinnedItem.subscribe((item: SelectedPin) => {
        console.log('---folder slide get pin', item);
        viewFolders = item.dirPannel;
    })
    console.log({viewFolders})
    const setView = () => { 
        console.log('----- set view update store')
        pushPinFolder(!viewFolders);
    }

    const changePath = ( folder:string): void => {
        gotToFolder(folder)
    }
</script>

<style>
       .folders {
        display: block;
        width: 200px;
        box-shadow: 0 0 20px #aaa;
        position: fixed;
        z-index: 1;
        background: white;
        left: 0;
        color: black;
        list-style: none;
        padding: 2em 1em;
        height: 100%;
        top: 40px;
        user-select: none;
        margin-left: -180px;
    }
    .folders.view {
        margin-left: unset;
    }
    .folders:empty {
        display: none;
    }
    .folders ul:empty{
        display: none;
    }
    .folders:hover {
        left: 0;
        color: black;
    }
    li {
        cursor: pointer;
        padding: .5em ;
    }
    li:hover{
        outline: 1px solid #ddd;
    }

</style>

<div class="folders" class:view={viewFolders} on:click={setView}>
    <Pinned {viewFolders}>
        <ul>
            {#if history.length > 1}
                <li>
                    <button on:click|stopPropagation>
                        {icons.back}
                    </button>
                </li>
            {/if}
            {#if folders && folders.length}
            {#each folders as folder}
                <li on:click|stopPropagation={() => changePath(folder)}>{icons.folder} {folder}</li>
            {/each}
            {/if}
        </ul>
    </Pinned>
</div>