<script lang="ts">
	export let segment: string;
	import emoji from '../WS/UI/emoji'
	import { stats, pinnedItem, fullView } from '../WS/UI/store';

	const toggleFolderSlide = () => {
		pinnedItem.update(actualValue => {
			console.log('bididi', {actualValue});
			return {
				...actualValue,
				dirPannel: !actualValue.dirPannel 
			}
		});
	}
</script>

<style lang="scss">
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
		display: flex;
    	justify-content: space-around;
		.helper {
			display: flex;
			align-items: center;
			margin-left: auto;
			span + span {
				margin-left: 1em;
				cursor: pointer;
			}
		}
		&.fullView {
			display: none;
		}
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav class:fullView={$fullView}>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
		<li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a></li>
		<li><a aria-current="{segment === 'story' ? 'page': undefined }" href="story">story</a></li>
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li>
	</ul>
	<div class="helper">
		{#if $stats.images && $stats.images > 0}
			<span>{emoji.images} {$stats.images}</span>
		{/if}
		<span 
			on:click={toggleFolderSlide}
			title="show/hide folder slide"
		>{$stats.folders > 0 ? `${emoji.folder} ${$stats.folders}` : `${emoji.folder}`}</span>
		
	</div>
</nav>
