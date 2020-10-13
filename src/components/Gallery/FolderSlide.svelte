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
    
    const { getSelected } = getContext('selected');
    let carouselActive = getSelected();

    pinnedItem.subscribe((item: SelectedPin) => {
        viewFolders = item && item.dirPannel;
    });

    const changePath = ( folder:string): void => {
        gotToFolder(folder);
        pushPinFolder(!viewFolders);
    }
</script>

<style lang='scss'>
    .folders {
        display: block;
        width: 400px;
        position: fixed;
        z-index: 1;
        background: transparent;
        left: 0;
        color: black;
        list-style: none;
        height: 100%;
        top: 40px;
        user-select: none;
        margin-left: -400px;
        padding: 2em;
        ul {
            pointer-events: none;
        }
        &:hover {
            margin-left: -175px;
        }
        &.hide {
            display: none;
        }
        &.view {
            margin-left: unset;
            overflow: scroll;
            width: 50%;
            background: white;
            @media only screen and (max-width: 576px) {
                width: 100%;
            }
        }
    }
    .folders.view ul {
        pointer-events: auto;
        li {
            cursor: pointer;
            padding: .5em ;
            &:hover{
                outline: 1px solid #ddd;
            }
        }
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
    
</style>

<div class="folders" class:view={viewFolders} class:hide={Boolean($carouselActive)}>
    <ul>
        {#if history.length > 1}
            <li on:click|stopPropagation>
                <button>
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
</div>