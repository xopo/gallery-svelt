<script lang="ts">
    import {getContext} from 'svelte';
    import { slide } from 'svelte/transition';
    import Carousel from './Carousel.svelte';
    export let images: Array<string>;
    export let basePath: string;

    
    let selected: {img: string, src: string} = null;

    const { getSelected } = getContext('selected');
    const selectedContext = getSelected();
    let y: number=2000;
    let scrollValue: number;
    
    const setSrc = (img: string): string => `cached/images/${basePath}${img}`;
    const select = (img: string): void => { 
        const src =`${basePath}${img.replace('.thumb', '')}`;
        selected = { img: img, src};
        scrollValue = y;
        console.log('set scroll', {y, scrollValue})
    };

    const unselect = () => {
        selected = undefined;
        setTimeout(() => {
            window.scrollTo(0, scrollValue);
        }, 5);
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
        console.log(y);
        selectedContext.set( selected ? {src: basePath, img: selected.img } : null);
    }
       
</script>

<style lang="scss">
	.gallery {
		display: flex;
    	flex-wrap: wrap;
        user-select: none;
        img {
            height: 250px;
            width: auto;
            object-fit: cover;
            flex: 1;
            border: 1px solid transparent;
            cursor: pointer;
            @media only screen and (max-width: 576px) {
                height: unset;
                width: 25%;
            }
        }
    }
    .gallery.selected {
            opacity: 0;
            height: 80vh;
            overflow: hidden;
    }
        
 
</style>
<svelte:window bind:scrollY={y} />
{#if images && images.length}
<div class='gallery' transition:slide|local class:selected>
{#each images as image}
	<img on:click={() => select(image)} src={setSrc(image)} alt={image}>
{/each}
</div>
{/if}
{#if selected}
<Carousel {...{selected, unselect, nextImg, previousImg}}/>
{/if}
