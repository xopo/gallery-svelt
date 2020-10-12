<script lang="ts">
    export let selected: { img: string, src: string };
    export let unselect = () => null;
    export let nextImg = () => null;
    export let previousImg = () => null;
    
    let WS = null;
    let img: string;
    let src: string;

    $: ({img, src} = selected);
    
    const escapeView = ({key}) => {
        if (key === 'Escape') unselect();
    }
</script>
<style>
    .carousel {
        position: absolute;
        background: rgba(0, 0, 0, 0.9);;
        top: 0;
        left: 0;
        margin: 0 auto;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        user-select: none;
    }
    .img-container {
        flex-grow: 1;
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
    }
    .img-container div {
        max-height: calc(100% - 4em);
        width: 100%;
        display: flex;
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
        position: absolute;
        opacity: .2;
    }
    .control:hover {
        background-color: rgba(255, 255, 255, 0.03);
    }
    .prev {
        background: left 0 center / contain no-repeat url('/left.png');
    }
    .next {
        background: right 0 center / contain no-repeat url('/right.png');
        right: 0;
    }
</style>
<svelte:window on:keydown={escapeView}/>
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