<script>
    import { onMount, beforeUpdate } from 'svelte'
    import { frames } from '../js/stores'
    import Frame from './Frame.svelte'

    let switcher;
    $: show = 1

    onMount(() => {
        switcher = setTimeout(switchFrames, 1000)
    })

    const switchFrames = () => {
        if (show > $frames.length) show = 1
        else show = show === $frames.length ? 1 : show + 1;
        switcher = setTimeout(switchFrames, 1000)
    }

</script>
<style>

</style>

<div class="flex-col">
    <h2>preview</h2>
    <div>
        {#if $frames.length >= show}
            <Frame pixels={$frames[show - 1]} preview={true}/>
        {/if}
    </div>
</div>