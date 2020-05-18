<script>
	import { onMount } from 'svelte'
    import WalletController from '../js/WalletController'

    let walletController;
    let connectionInfo = {
		appName: "Pixel Board",
		description: "Create a fun pixel board or animation to express your personality on Lamden's blockchain!",
		contractName: "con_wallet_testing",
		networkType: "testnet",
		logo: "/logo-192.png"
	}

    $: installed = false
    $: locked = true
    $: walletInfo = {}

	onMount(async () => {
        
        walletController = new WalletController()
        walletController.events.on('newInfo', handleMyEvent);
		walletController.walletIsInstalled().then(res => {
            installed = true
			walletController.getInfo()
				.then(res => {
                    locked = res.locked
                })
				.catch(err => {
				if (err[0].includes("lamdenWalletConnect")){
					walletController.createConnection(connectionInfo)
					walletController.sendConnection()
						.then(res => console.log(res))
						.catch(err => console.log(err))
				}
			})
		})
    })

    const handleMyEvent = (data) => {
        if (typeof data.installed !== 'undefined') installed = data.installed
        if (typeof data.locked !== 'undefined') locked = data.locked
    };
    
	const openLink = (url) => {
        if (!installed) window.open(url, '_blank');
        
	}
</script>

<style>
	.install-box{
		background: #461BC2;
		color: #eae3ff;
        width: 213px;
        padding: 5px;
        justify-content: center;
        border-radius: 10px;
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
        font-size: 1.3em;
	}
	.install-box:hover{
		background: rgb(86, 41, 221);
		box-shadow: 3px 3px 24px -10px rgba(0, 0, 0, 0.904);
	}
	.install-box.installed{
		background: #0fb40f;
		color: #e0ffe0;
	}
</style>

<button 
    class="install-box flex-row" 
    class:installed={installed} 
    on:click={() => openLink('https://chrome.google.com/webstore/detail/lamden-wallet-browser-ext/fhfffofbcgbjjojdnpcfompojdjjhdim')}>
    {#if installed}
        {#if locked}
            Wallet Locked
        {:else}
            Wallet Unlocked
        {/if}
    {:else}
        Install Lamden Wallet
    {/if}
</button>