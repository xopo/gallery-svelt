<script lang='ts' >
	import { onMount, onDestroy, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import FolderSlide from '../components/Gallery/FolderSlide.svelte';
	import Gallery from '../components/Gallery/Gallery.svelte';
	import getSocket from '../WS/socket';
	import { stats } from '../WS/UI/store';
	import type { Content } from '../WS/types';
	import { getURILocation } from '../WS/UI/helpers';

	let selected = writable({});
	setContext('selected', {
		getSelected: () => selected
    })

	let WS = null;
	let subscription = () => {};
	let folders = [];
	let images = [];
	let basePath = '/';
	let gotToFolder = (s: string): void => {};
	let history = [];
	let waitingForImage = false;
	let processInterval: number;
	
	$: if (WS) {
		/* get content when path is changed */
		WS.send({ getContent: { dirPath: getURILocation(history) } });
	}

	function updateImages(newEntries: Array<string>): void {
		if (!newEntries.length) return;
		processInterval = setInterval(function() {
			if (waitingForImage) return;
			const batch = newEntries.splice(0, 10);
			
			if (!batch.length || !newEntries.length) {
				clearInterval(processInterval);
			}
			if (batch) {
				WS.send({ getThumbnail: { dirPath: getURILocation(history), batch } });
				waitingForImage = true
			}
		}, 50);
	}

	onMount(()=>{
		console.log('on mount index')
		WS = getSocket();
		setTimeout(() => {
			history.push('/')
		}, 1);

		subscription = WS.content.subscribe((data: Content) => {
			if (data.processed) {
				const { thumbs, message} = data.processed;
				
				images = [...images, ...thumbs];
				waitingForImage = false;
				if (message === 'completed') {
					clearInterval(processInterval);
				}
			} else {
				({ basePath, folders} = data);
				stats.update( _ => ({
					images: data?.images?.length || 0,
					folders: data?.folders?.length || 0
				}));
				images = [];
				updateImages(data.images || []);
			}
		});

		gotToFolder = (folder: string): void => {
			history = [...history, folder];
		}
	});

	onDestroy(() => {
		clearInterval(processInterval);
		return subscription;
	});

	const onGoBack = () => {
		clearInterval(processInterval);
		waitingForImage = false;
		history.length = history.length - 1
	}
</script>

<head>
	<title>Gallery</title>
</head>
{#if folders && history}
<FolderSlide on:click={onGoBack} {...{folders, gotToFolder, history}} /> 
{/if}
{#if images.length && basePath}
<Gallery  {...{images, basePath}} />
{/if}


