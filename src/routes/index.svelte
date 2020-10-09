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
		console.log('trigger get content')
		WS.send({ getContent: { dirPath: getURILocation(history) } });
	}
	onMount(()=>{
		WS = webSock();
		WS.init();
		setTimeout(() => {
			// WS.send({ getContent: { dirPath: herstory } });
			history.push('/')
		}, 50);

		subscription = WS.content.subscribe((data: Content) => {
			({folders, images, basePath} = data);
		})

		gotToFolder = (folder: string) => {
			history = [...history, folder];
			// setTimeout(() => {
			// 	console.log('req data');
			// 	WS.send({ getContent: { dirPath: herstory } });
			// },10);
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


