<script>
    import { onMount } from 'svelte'
    import { frames } from '../js/stores'
    import Frame from './Frame.svelte'

    onMount(() => switchFrames())

    $: show = 0

    const switchFrames = () => {
        show = show === 2 ? 0 : show + 1;
        setTimeout(switchFrames, 1000)
    }

</script>
<style>

</style>

<div class="flex-col">
    <h2>preview</h2>
    <div>
        <Frame pixels={$frames[show]}/>
    </div>
</div>