<script lang='ts' >
	import { onMount, onDestroy } from 'svelte';
	import { getMessage, setMessage } from '../WS/wsHelper';
	import webSock from '../WS/socket';
	let WS = null;
	let subscription = () => {};
	let folders = [];
	let images = [];
	
	onMount(()=>{
		WS = webSock();
		WS.init();
		setTimeout(() => {
			WS.send('getContent');
		}, 50);

		subscription = WS.content.subscribe((data: {folders:Array<string>, images: Array<string>}) => {
			folders = data.folders;
			images = data.images;
		})
	});

	onDestroy(subscription);
</script>

<head>
	<title>Gallery</title>
</head>
<ol>
	<li>get list of folders and pictures from backend</li>
	<li>make request using ws</li>
	<li>create server side functionality for browse functionality</li>
	<li>return root entries</li>
	<li>use navigation for root/foolder/infolder</li>
	
</ol>

{JSON.stringify({folders, images}, null, 2)}

{#if folders && folders.length}
<ul>
{#each folders as folder}
	<li>{folder}</li>
{/each}
</ul>
{/if}

{#if images && images.length}
<ul>
{#each images as image}
	<li>{image}</li>
	<img src={`/boko/${image}`} alt="some">
{/each}
</ul>
{/if}