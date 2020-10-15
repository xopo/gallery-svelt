<script lang="ts">
    export let src: string;
    export let alt: string;

    import Lazy from './Lazy.svelte';
    import Image from './Image.svelte';
</script>

<Lazy once={true} let:visible={visible}>
    {#if visible}
        <Image {...{src, alt}}/>
    {/if}
</Lazy>