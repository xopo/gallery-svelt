<script>
    import { onMount } from 'svelte';

    export let once = false;
    export let top = 0;
    export let left = 0;
    export let right = 0;
    export let bottom = 0;

    let visible = false;
    let container;

    onMount(() => {
        if (typeof IntersectionObserver !== 'undefined') {
            const rootMargin = `${top}px ${right}px ${bottom}px ${left}px`;

            const observer = new IntersectionObserver(entries => {
                visible = entries[0].isIntersecting;
                if (visible && once) {
                    observer.unobserve(container);
                }
            }, {
                rootMargin
            });

            observer.observe(container);
            return () => observer.unobserve(container);
        }
   
        // function fullBackLazy() {
        //     const bcr = container.getBoundingClientRect();

        //     intersecting = (
        //         (bcr.bottom + bottom) > 0 &&
        //         (bcr.right + right) > 0 &&
        //         (bcr.top - top) < window.innerHeight &&
        //         (bcr.left - left) < window.innerWidth 
        //     );

        //     if (intersecting && once) {
        //         window.removeEventListener('scroll', fullBackLazy);
        //     }
        // }

        // window.addEventListener('scroll', handler);
        // return () => window.removeEventListener('scroll', fullBackLazy);
    });

</script>
<style>
    div {
        min-width: 100px;
        min-height: 100px;
        /* border: 1px solid transparent; */
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 50%;
    }
</style>
<div bind:this={container}>
    <slot {visible}></slot>
</div>