<script lang="ts">
    import emoji from '../../WS/UI/emoji';
    export let selected: { img: string, src: string };
    export let unselect = () => null;
    export let nextImg = () => null;
    export let previousImg = () => null;
    
    let WS = null;
    let img: string;
    let src: string;
    let showHelpers: boolean = false;

    $: ({img, src} = selected);
    
    const escapeView = ({key}) => {
        if (key === 'Escape') unselect();
    }
    const showHelpbars = () => showHelpers = !showHelpers;
</script>
<style lang='scss'>
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
    .container {
        flex-grow: 1;
        height: 100%;
        width: 100%;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        display: flex;
    }
    .image-container {
        position: relative;
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
    .bar {
        padding: 0;
        width: 100%;
        background: rgba(255,255,255,.1);
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        height: 0;
        &.showHelpers {
            visibility: visible;
            height: 2.5em;
            padding: 1em;
        }
        &.nav {
            justify-content: space-around;
        }
        &.tools {
            justify-content: space-around;
            bottom: 0;
        }
        button {
            background: transparent;
            border: 1px solid rgba(255,255, 255, 0.3);
            padding: .2em 1.5em;
            font-size: 1.5em;
            border-radius: 7px;
            box-shadow: 0px 0px 3px #aaa;
        }

    }

</style>
<svelte:window on:keydown={escapeView}/>
<div class="carousel">
    <div class="container" on:click={showHelpbars}>
        <div class="bar nav" class:showHelpers>
            <button  on:click={unselect}>{emoji.up}</button>
            <button>{emoji.back}</button>
        </div>
        <div class="image-container">
            <div class="control prev" on:click|stopPropagation={previousImg}>previous</div>
            <img src="{src}" alt="{img}">
            <div class="control next" on:click|stopPropagation={nextImg}>next</div>
        </div>
        <div class="bar tools" class:showHelpers>
            <button>{emoji.rotateLeft}</button>
            <button>{emoji.rotateRight}</button>
            <button>{emoji.delete}</button>
        </div>
    </div>
</div>
