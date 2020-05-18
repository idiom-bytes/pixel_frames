<script>
    import { frames, currentFrame } from '../js/stores'

    const clear = () => {
        frames.update(f => {f[$currentFrame] = Array.from(Array(900).keys()); return f})
    }
</script>

<style>
    button {
        background: white;
        padding: 5px;
        margin: 5px;
    }
</style>

<button value="clear" on:click ={clear}> Clear </button>