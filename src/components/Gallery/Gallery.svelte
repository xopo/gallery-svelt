<script lang="ts">
    export let folders;
    export let images;
    export let gotToFolder;
    export let basePath;
    export let history;

    $: console.log('++++ images', {basePath},images);
</script>

<style>
	.gallery {
		display: flex;
    	flex-wrap: wrap;
	}
	.gallery img {
        height: 150px;
        width: auto;
        object-fit: cover;
        flex: 1;
        border: 1px solid transparent;
	}
    .folders {
        display: block;
        max-width: 200px;
        box-shadow: 0 0 20px #aaa;
        position: fixed;
        z-index: 1;
        background: white;
        /* left: -150px; */
        left: 0;
        color: black;
        list-style: none;
        padding: 2em 1em;
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
                🔙
            </button>
        </li>
    {/if}
    {#if folders && folders.length}
    {#each folders as folder}
        <li on:click={() => gotToFolder(folder)}>{folder}</li>
    {/each}
    {/if}
</ul>

{#if images && images.length}
<div class='gallery'>
{#each images as image}
	<img src={`${basePath}${image}`} alt="some">
{/each}
</div>
{JSON.stringify({basePath, images}, null, 2)}
{/if}