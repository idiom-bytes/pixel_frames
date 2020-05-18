<script>
    import { currentColor, frames, currentFrame } from '../js/stores'
    import Pixel from './Pixel.svelte'

    const changeColor = (e) => {
        if ($frames[$currentFrame][e.detail] !== $currentColor){
            frames.update(f => {f[$currentFrame][e.detail] = $currentColor; return f})
        }
    }
</script>

<style>
.board {
  grid-template-columns: repeat(30, 20px);
  grid-template-rows: repeat(30, 20px);
}

</style>

<div class="board" on:drag|preventDefault>
    {#each $frames[$currentFrame] as pixel, index}
        <Pixel {pixel} {index} on:colorChange={changeColor}/>
    {/each}
</div>