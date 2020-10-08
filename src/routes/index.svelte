<script lang='ts'>
	import { onMount } from 'svelte';
	import { getMessage, setMessage } from '../WS/wsHelper';
	
	onMount(async() => {
		const protocol = window && window.location.protocol === 'https' ? 'wss' : 'ws';
		const wsurl = `${protocol}://${window.location.host}`;
		const ws = new WebSocket(wsurl);
		
		ws.onopen = _ => ws.send(setMessage('I just open com'));
		ws.onclose = _ => ws.send(setMessage('I just close'));

		ws.addEventListener('message', ({data}) => {
			console.log({data})
			ws.send(setMessage('hello'));
		});

		
	})
</script>

<head>
	<title>Gallery</title>
</head>
<ol>
	<p>request a list of data from backend</p>
	<p>get the list and create a list of folders as sidebar ul</p>
	<p>get a list of images and create a galery layout</p>
	<p>should be able to open a folder and see the pictures</p>
	<p>should be able to </p>
</ol>
