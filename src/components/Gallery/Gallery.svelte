<script lang="ts">
    import icons from '../../WS/UI/emoji';
    export let folders: Array<string>;;
    export let images: Array<string>;;
    export let gotToFolder: (s :string)=>void;
    export let basePath: string;
    export let history: Array<string>;
</script>

<style>
	.gallery {
		display: flex;
    	flex-wrap: wrap;
        user-select: none;
	}
	.gallery img {
        height: 150px;
        width: auto;
        object-fit: cover;
        flex: 1;
        border: 1px solid transparent;
        cursor: pointer;
	}
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
    }
    .folders:empty {
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

<ul class='folders'>
    {#if history.length > 1}
        <li>
            <button on:click>
                {icons.back}
            </button>
        </li>
    {/if}
    {#if folders && folders.length}
    {#each folders as folder}
        <li on:click={() => gotToFolder(folder)}>{icons.folder} {folder}</li>
    {/each}
    {/if}
</ul>

{#if images && images.length}
<div class='gallery'>
{#each images as image}
	<img src={`${basePath}${image}`} alt="some">
{/each}
</div>
{/if}