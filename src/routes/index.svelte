<script>
	import PixelBoard from '../components/PixelBoard.svelte'
	import Pallet from '../components/Pallet.svelte'
	import Frames from '../components/Frames.svelte'
	import Preview from '../components/Preview.svelte'
</script>
<style>
.flex-col{
	justify-content: center;
	align-items: center;
}
.flex-row{
	width: 100%;
	justify-content: space-around;
	align-items: center;
}
</style>

<svelte:head>
	<title>Pixel Board</title>
</svelte:head>

<div class="flex-col">
	<div class="flex-row">
		<Frames />
		<Preview />
	</div>
	<Pallet />
	<PixelBoard />
</div>






