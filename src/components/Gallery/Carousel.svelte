<script lang="ts">
    export let selected: { img: string, src: string };
    let img: string;
    let src: string;
    $: {
        ({img, src} = selected);
    }
</script>
<style>
    .carousel {
        position: fixed;
        height: 90%;
        width: 80%;
        background: #aaa;
        top: 2em;
        /* left: 15em; */
        margin: 0 auto;
    }
</style>
<div class="carousel">
    <h3>Carousel</h3>
    <img src="{src}" alt="{img}">
</div>
{JSON.stringify(selected, null, 2)}