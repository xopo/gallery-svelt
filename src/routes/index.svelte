<script lang='ts' >
	import { onMount, onDestroy } from 'svelte';
	import Gallery from '../components/Gallery/Gallery.svelte';
	import getSocket from '../WS/socket';
	import type { Content } from '../WS/types';
	import { getURILocation } from '../WS/UI/helpers';

	let WS = null;
	let subscription = () => {};
	let folders = [];
	let images = [];
	let stopLoadImages = false;
	let newSet = true
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
			const [img, ...rest] = newEntries;
			newEntries = rest;
			if (!img || !newEntries) {
				clearInterval(processInterval);
			}
			if (img) {
				WS.send({ getThumbnail: { dirPath: getURILocation(history), img } });
				waitingForImage = true
			}
		}, 50);
	}

	onMount(()=>{
		WS = getSocket();
		setTimeout(() => {
			// WS.send({ getContent: { dirPath: herstory } });
			history.push('/')
		}, 1);

		subscription = WS.content.subscribe((data: Content) => {
			if (data.processed) {
				const { thumb, message} = data.processed;
				
				images = [...images, thumb];
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
			stopLoadImages = true;
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
<Gallery 
	on:click={onGoBack} 
	{...{folders, images, gotToFolder, basePath, history}}
/>
<ol>
	<li>create a save setup folder to remember pinned items</li>
	<li>get preferences on </li>
</ol>


