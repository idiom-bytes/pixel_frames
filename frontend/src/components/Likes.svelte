<script>
    import { getContext, onMount } from 'svelte'
    import { goto } from '@sapper/app';
    import { userAccount, autoTx } from '../js/stores.js'
    import Frame from './Frame.svelte'
    import FrameCanvas from './FrameCanvas.svelte'
    import Price from './Price.svelte'
    import { createSnack, alreadyLiked, createWatermark } from '../js/utils.js'

    //Pictures
    import like_filled from '../../static/img/like-filled.svg'
    import like_unfilled from '../../static/img/like-unfilled.svg'

    const { sendTransaction } = getContext('app_functions')

    export let thingInfo;

    let liked = null;

    onMount(() => {
        checkAlreadyLiked();
    })

    const checkAlreadyLiked = () => {
        if (liked === null && $userAccount)  alreadyLiked(thingInfo.uid, localStorage).then(res => liked = res)
    }


    const like = () => {
        if (liked || !$userAccount) return;

		const transaction = {
			methodName: 'like_thing',
			networkType: 'testnet',
			stampLimit: 100000,
			kwargs: {
				uid: thingInfo.uid
			}
		}

        sendTransaction(transaction, handleLikeTx)
    }

    const handleLikeTx = (txResults) => {
        if (txResults.txBlockResult.status === 0) {
            liked = true;
            thingInfo.likes = thingInfo.likes + 1;
        }
    }

    userAccount.subscribe(account => checkAlreadyLiked())

</script>
<style>
    .flex-row{
        align-items: center;
        justify-content: space-between;
    }
    .icon {
        margin-right: 5px;
        width: 20px;
        height: 30px;
        cursor: pointer;
    }

</style>


<div class="flex-row likes">
    <div class="hide-mobile icon" on:click={like}>
        {#if liked !== null}
            {@html liked ? like_filled : like_unfilled}
        {:else}
            {@html like_unfilled}
        {/if}
    </div>

    <div class="show-mobile icon">
        {@html like_unfilled}
    </div>
    {thingInfo.likes}
</div>





