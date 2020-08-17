<script context="module">
	import { config } from '../../js/config.js'
	export async function preload(parms) {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				contractName: 'con_pf_test',
				variableName: 'S'
			})
		}
		const res = await this.fetch(`${config.blockExplorer}/things/forsale?limit=30`, options)
		let data = await res.json()
		if (!data) data.data = []
		data.data = data.data.filter(thing => !config.ownerBlacklist.includes(thing.owner) && !config.thingBlacklist.includes(thing.uid))
	    return {forsale: data}
	}
</script>

<script>
    import ForSale from '../../components/ForSale.svelte'

    export let forsale;

</script>

<ForSale {forsale}/>