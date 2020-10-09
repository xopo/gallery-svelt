<script lang='ts' >
	import { onMount, onDestroy } from 'svelte';
	import Gallery from '../components/Gallery/Gallery.svelte';
	import Logs from '../components/Logs.svelte';
	import webSock from '../WS/socket';
	import type { Content } from '../WS/types';
	import { getURILocation } from '../WS/UI/helpers';

	let WS = null;
	let subscription = () => {};
	let folders = [];
	let images = [];
	let basePath = '/';
	let gotToFolder;
	let history = [];
	
	// get content on history change
	// $: herstory = getURILocation(history);
	// $: console.log(herstory)
	$: if (WS) {
		WS.send({ getContent: { dirPath: getURILocation(history) } });
	}

	function updateImages(newEntries) {
		if (newEntries.length) {
			images = [...images, ...newEntries.splice(0 ,30)];
			setTimeout(() => { 
				updateImages(newEntries);
			}, 3000);
		}
	}

	onMount(()=>{
		WS = webSock();
		WS.init();
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

		gotToFolder = (folder: string) => {
			history = [...history, folder];
		}
	});

	onDestroy(subscription);
</script>

<head>
	<title>Gallery</title>
</head>
<Gallery on:click={() => history.length = history.length - 1} {folders} {images} {gotToFolder} {basePath} {history}/>
<Logs />
<ol>
	<li>create server side functionality for browse different folders</li>
	<li>use navigation for root/foolder/infolder</li>
</ol>


