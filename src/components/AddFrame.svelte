<script>
    import { frames, currentFrame } from '../js/stores'

    const addFrame = () => {
        if ($frames.length < 4) frames.update(f => {f.push(Array.from(Array(256).keys())); console.log(f); return f})
        currentFrame.set($frames.length - 1)
    }
</script>

<style>
    button{
        box-sizing: border-box;
        padding-bottom: 4px;
        height: 45px;
        width: 45px;
        font-size: 1.5em;
        justify-content: center;
        align-items: center;
    }
</style>

<button class="board flex-row" on:click={addFrame}>
    +
</button>
