<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import Logs from '../components/Logs.svelte';
	import PinnedComponent from '../components/Pinned.svelte';
	import { pinnedItem, pushPinLogs } from '../WS/UI/store';
	import type { SelectedPin } from '../WS/types';

	export let segment: string;
	let viewLogs=false;
	pinnedItem.subscribe((item: SelectedPin) => {
		console.log('~~~ got viewLogs value from store', item)
		viewLogs = item && item.logs;
    })
	const setLogsPin = () => {
		pushPinLogs(!viewLogs);
	}
</script>

<style lang='scss'>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: .5em;
		margin: 0 auto;
		box-sizing: border-box;
	}
	.logs {
        background: white;
        border: 1px solid gray;
        position: fixed;
        bottom: 0;
        right: 0;
        width: 50%;
		@media only screen and (max-width: 576px) {
			display: none;
		}
    }
	.logs.pinpush{
        height: 500px;
    }
</style>

<Nav {segment}/>
<main>
	<slot></slot>
</main>
<div class="logs" on:click={setLogsPin} class:pinpush={viewLogs}>
	<PinnedComponent pinSet={viewLogs}>
		<Logs />
	</PinnedComponent>
</div>