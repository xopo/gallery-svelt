<script lang='ts'>
    import { getContext } from 'svelte';
    import { slide } from 'svelte/transition';
    import Pinned from '../Pinned.svelte';
    import icons from '../../WS/UI/emoji';
    import { pinnedItem, pushPinFolder} from '../../WS/UI/store';
    import type { SelectedPin } from '../../WS/types';
    
    export let folders: Array<string>;
    export let history: Array<string>;
    export let gotToFolder: (s :string)=>void;
    
    let viewFolders:boolean;
    
    console.log('selected context', getContext('selected'))
    const { getSelected } = getContext('selected');
    
    let carouselActive = getSelected();

    pinnedItem.subscribe((item: SelectedPin) => {
        viewFolders = item.dirPannel;
    })
    
    const setView = () => { 
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
        height: 100%;
        top: 40px;
        user-select: none;
        margin-left: -180px;
    }
    .folders.hide {
        display: none;
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
    ul {
        list-style: none;
        padding-left: 0;
        padding-right: 1em;
        margin: 0;
    }
    .view ul {
        padding-right: 0;
    }
    li {
        cursor: pointer;
        padding: .5em ;
    }
    li:hover{
        outline: 1px solid #ddd;
    }

</style>

<div class="folders" class:view={viewFolders} class:hide={Boolean($carouselActive)} on:click={setView} transition:slide>
    <Pinned pinSet={viewFolders}>
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