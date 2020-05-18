<script>
    import { currentFrame } from '../js/stores'
    export let pixels
    export let frameNum = null;
</script>

<style>
    .board {
	    grid-template-columns: repeat(30, 3px);
	    grid-template-rows: repeat(30, 3px);
    }
    .selected{
        border: 2px solid #b2d7b2;
    }
</style>

<div class="board" class:selected={frameNum !== null ? $currentFrame === frameNum : false} on:click={currentFrame.set(frameNum)}>
    {#each pixels as pixel, index}
        <div class="pixel" style={`background: ${pixel}`} />
    {/each}
</div>