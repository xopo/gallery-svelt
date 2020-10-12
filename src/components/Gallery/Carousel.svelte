<script lang="ts">
    export let selected: { img: string, src: string };
    export let unselect;
    export let nextImg;
    export let previousImg;
    
    let WS = null;
    let img: string;
    let src: string;

    $: ({img, src} = selected);
</script>
<style>
    .carousel {
        position: fixed;
        background: rgba(0, 0, 0, 0.9);;
        top: 1em;
        left: 1em;
        margin: 0 auto;
        right: 1em;
        bottom: 1em;
        display: flex;
        align-items: center;
        user-select: none;
    }
    .img-container {
        flex-grow: 1;
        display: flex;
        height: 100%;
        align-items: center;
    }
    .img-container div {
        max-height: calc(100vh - 2em);
        width: 100%;
    }
    img {
        width: 100%;
        height: auto;
        object-fit: contain;
    }

    .control {
        color: transparent;
        height: 200px;
        display: flex;
        align-items: center;
        width: 80px;
        height: 100%;
    }
    .control:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    .prev {
        background: left 0 center / contain no-repeat url('/left.png');
    }
    .next {
        background: right 0 center / contain no-repeat url('/right.png');
    }
</style>
<div class="carousel" on:click={unselect}>
    <div class="control prev" on:click|stopPropagation={previousImg}>previous</div>
    <div class="img-container">
        <div>
            <img src="{src}" alt="{img}" on:click|stopPropagation>
        </div>
    </div>
    <div class="control next" on:click|stopPropagation={nextImg}>next</div>
</div>
{JSON.stringify(selected, null, 2)}