<script lang='ts' >
	import { onMount, onDestroy } from 'svelte';
	import FolderSlide from '../components/Gallery/FolderSlide.svelte';
	import Gallery from '../components/Gallery/Gallery.svelte';
	import getSocket from '../WS/socket';
	import type { Content } from '../WS/types';
	import { getURILocation } from '../WS/UI/helpers';

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
			// WS.send({ getContent: { dirPath: herstory } });
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
				({folders, basePath} = data);
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
<ol>
	<li>create a save setup folder to remember pinned items</li>
	<li>get preferences on </li>
</ol>


