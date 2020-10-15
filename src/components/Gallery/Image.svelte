<script lang="ts">
    export let src:string;
    export let alt:string;

    import { onMount } from 'svelte';

    let loaded:boolean = false;
    let thisImage;

    console.log({src, alt})
    onMount(() => {
        thisImage.onload = () => {
            loaded = true;
        }
    })
    console.log('visible', alt);
</script>

<style lang='scss'>
    img {
        height: 200px;
        opacity: 0;
        transition: opacity 1200ms ease-out;

        height: 250px;
        width: auto;
        object-fit: cover;
        flex: 1;
        cursor: pointer;
        border: 1px solid white;
        @media only screen and (max-width: 576px) {
            height: unset;
            width: 25%;
        }
    }
    img.loaded {
        opacity: 1;
    }
</style>

<img src={src} alt={alt} class:loaded bind:this={thisImage} loading="lazy"/>