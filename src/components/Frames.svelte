<script>
        import { frames } from '../js/stores'
        import Frame from './Frame.svelte'
</script>
<style>
.flex-row{
    justify-content: space-evenly;
    align-items: center;
}
</style>

<div class="flex-col">
    <h2>frames</h2>
    <div class="flex-row">
        {#each $frames as pixels, index }
            <Frame {pixels} frameNum={index} />
        {/each}
    </div>
</div>