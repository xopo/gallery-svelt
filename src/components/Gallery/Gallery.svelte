<script lang="ts">
    import {getContext} from 'svelte';
    import { slide } from 'svelte/transition';
    import Carousel from './Carousel.svelte';
    export let images: Array<string>;
    export let basePath: string;

    
    let selected: {img: string, src: string} = null;

    const { getSelected } = getContext('selected');
    const selectedContext = getSelected();
    
    const setSrc = (img: string): string => `cached/images/${basePath}${img}`;
    const select = (img: string): void => { 
        selected = { img, src: setSrc(img)};
    };

    const unselect = () => {
        selected = undefined;
    }

    const nextImg = () => {
        if (selected) {
            const selectIndex: number = images.findIndex((img: string): boolean => img === selected.img);
            const nextImg = selectIndex + 1 === images.length ? images[0] : images[selectIndex + 1];
            
            select(nextImg);
        }
    }

    const previousImg = () => {
        if (selected) {
            const selectIndex: number = images.findIndex((img: string): boolean => img === selected.img);
            const nextImg = !images[selectIndex - 1] ? images[images.length - 1] : images[selectIndex - 1];
            
            select(nextImg);
        }
    }

    // reactive set selected
    $: {
        console.log({basePath});
        selectedContext.set( selected ? {src: basePath, img: selected.img } : null);
    }
       
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
<div class='gallery' transition:slide|local>
{#each images as image}
	<img on:click={() => select(image)} src={setSrc(image)} alt={image}>
{/each}
</div>
{/if}
{#if selected}
<Carousel {...{selected, unselect, nextImg, previousImg}}/>
{/if}
