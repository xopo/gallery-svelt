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
	let basePath = '/';
	let gotToFolder = (s: string): void => {};
	let history = [];
	
	$: if (WS) {
		/* get content when path is changed */
		WS.send({ getContent: { dirPath: getURILocation(history) } });
	}

	function updateImages(newEntries: Array<string>) {
		if (newEntries.length) {
			images = [...images, ...newEntries.splice(0 ,30)];
			setTimeout(() => { 
				if (!stopLoadImages) {
					updateImages(newEntries);
					stopLoadImages = false
				};
			}, 500);
		}
	}

	onMount(()=>{
		console.log('get socket comp')
		WS = getSocket();
		console.log(typeof WS);
		setTimeout(() => {
			// WS.send({ getContent: { dirPath: herstory } });
			history.push('/')
		}, 50);

		subscription = WS.content.subscribe((data: Content) => {
			({folders, basePath} = data);
			images = [];
			console.log('update images', data.images)
			updateImages(data.images || []);
		})

		gotToFolder = (folder: string): void => {
			stopLoadImages = true;
			history = [...history, folder];
		}
	});

	onDestroy(subscription);
</script>

<head>
	<title>Gallery</title>
</head>
<Gallery 
	on:click={() => history.length = history.length - 1} 
	{...{folders, images, gotToFolder, basePath, history}}
/>
<ol>
	<li>create a ws singleton so it can be reused</li>
	<li> show logs </li>
	<li>create server side functionality for browse different folders</li>
	<li>use navigation for root/foolder/infolder</li>
</ol>


