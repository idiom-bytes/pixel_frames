

<script>
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import DisplayFrames from './DisplayFrames.svelte';
	import { formatThings, updateInfo } from "../js/utils";
	import { config } from '../js/config.js'
	import { userAccount } from '../js/stores.js'

	export let recent;
	export let preview = false;
	let sending = false;

    let formatted = formatThings (recent);

	const getMore = async () => {
    	if (sending) return;
		sending = true;
		const res = await fetch(`${config.blockExplorer}/things/${config.infoContract}/recent?limit=15&offset=${formatted.length}`)
		let data = await res.json()
		if (!data) data = []
		formatted = [...formatted, ...formatThings(data)]
		sending = false;
	}

	const updateThing = (e) => {
    	const { updates, index } = e.detail
    	updateInfo(formatted[index], updates)
		formatted = [...formatted]
	}

</script>

<style>
	h2{
		border-top: 1px solid lightgray;
		padding-top: 1rem;
		margin-top: 2rem;
	}
	button, a{
		max-width: fit-content;
		padding: 10px 20px;
    	margin: 0 auto;
	}
	.owned{
        border: 2px dashed #ff5bb0;
    }
</style>

<h2>Recent Creations</h2>
<div class="flex-row display-card">
    {#each formatted as thingInfo, index}
		<div class:owned={$userAccount ? thingInfo.owner === $userAccount : false}
			in:scale="{{duration: 200, delay: 0, opacity: 0, start: 0.75, easing: quintOut}}">
			<DisplayFrames pixelSize={8} {thingInfo} {index} on:update={updateThing}/>
		</div>
    {/each}
</div>
{#if preview}
	<a class="button" rel=prefetch href="{'recent'}">SEE MORE</a>
{:else}
	<button disabled={sending} class="button" on:click={getMore}> GET MORE </button>
{/if}