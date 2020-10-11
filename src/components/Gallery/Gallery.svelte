<script lang="ts">
    import Carousel from './Carousel.svelte';
    export let images: Array<string>;
    export let basePath: string;

    
    let selected: {img: string, src: string} = null;
    const setSrc = (img: string): string => `cached/images/${basePath}${img}`;
    const select = (img: string): void => { 
        selected = { img, src: setSrc(img)};
    };

    $: console.log('--galery', {basePath, images});
</script>

<style>
	.gallery {
		display: flex;
    	flex-wrap: wrap;
        user-select: none;
	}
	.gallery img {
        height: 250px;
        width: auto;
        object-fit: cover;
        flex: 1;
        border: 1px solid transparent;
        cursor: pointer;
	}
 
</style>
{#if images && images.length}
<div class='gallery'>
{#each images as image}
	<img on:click={() => select(image)} src={setSrc(image)} alt={image}>
{/each}
</div>
{/if}
{#if selected}
<Carousel {selected}/>
{/if}
