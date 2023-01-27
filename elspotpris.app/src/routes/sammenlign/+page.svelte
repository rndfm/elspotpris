<script>
	import { consumptionTypes } from '../../prices.js';
	import { consumption, customConsumption, calculatedProducts } from '../../stores.js';
	import {} from '../../data.js';
	import ProductDetails from '../../lib/ProductDetails.svelte';

	let productCalculations;
	calculatedProducts.subscribe((value) => {
		productCalculations = value;
	});

	function round(amount) {
		return (Math.round((amount + Number.EPSILON) * 100) / 100).toFixed(2);
	}

	function shouldWarn(product) {
		if (!product) {
			return false;
		}
		return (
			product.prices.some((p) => p.conditions === null || p.conditions || p.calculated || p.amount === undefined) ||
			product.fees.some((f) => f.amount === undefined || f.conditions === null || f.conditions)
		);
	}
</script>

<svelte:head>
	<title>elspotpris.dk - Sammenlign priserne hos elselskaberne.</title>
	<meta
		name="description"
		content="Her kan du sammenligne de reelle udgifter hos elselskaberne. Her vises spotpristillæg, betalingsgebyrer mv."
	/>
</svelte:head>

<h1>Sammenlign elprodukter med variabel pris</h1>
<p>
	<strong
		>Der sammenlignes på tillæg til spotprisen, abonnement og gebyrer. Altså den del, du betaler
		ekstra til et elselskab for at købe strømmen hos dem.</strong
	>
</p>
<p>
	Priserne vises uden elspotpris, elafgift og transport da disse ikke påvirkes af dit valg af
	elselskab.
</p>
<span>Ved forbrug pr. år.:</span>
<select bind:value={$consumption}>
	{#each consumptionTypes as item}
		<option value={item}>
			{item.name}
		</option>
	{/each}
</select>
{#if $consumption.amount === null}
	<p>
		<label for="customConsumption">Indtast årligt forbrug (kWh)</label>
		<input id="customConsumption" type="number" bind:value={$customConsumption} />
	</p>
{/if}
{#if productCalculations}
	<div class="table-scroll">
		<table>
			<thead>
				<tr
					><td>Produkt</td><td class="right hide-small">kWh tillæg</td><td class="right hide-small"
						>Abonnement & gebyrer</td
					><td class="right">Årlige omkostninger<small>(eksl. elspotpris)</small></td></tr
				>
			</thead>
			{#each productCalculations.sort((a, b) => a.calculatedPrices.total - b.calculatedPrices.total) as item}
				<tr>
					<td
						><button class="product" on:click={() => (item.open = !item.open)}
							><span class="chevron" class:open={item.open} />{item.name}{#if shouldWarn(item)}<img
									class="warning"
									src="/warning.svg"
									alt="Advarsel"
									title="Der er bemærkninger til prisen. Klik for mere info."
									width="16"
									height="16"
								/>{/if}</button
						>
						<div class="collapsable details" class:open={item.open}>
							<ProductDetails product={item}></ProductDetails>
						</div>
						</td
					>
					<td class="amount hide-small">{round(item.calculatedPrices.surcharges)} kr</td>
					<td class="amount hide-small">{round(item.calculatedPrices.fees)} kr</td>
					<td class="amount"><strong>{round(item.calculatedPrices.total)} kr</strong></td>
				</tr>
			{/each}
		</table>
	</div>
{/if}

<p>Omkostningerne vises årligt for det valgte forbrug. Alle priser vises eksl. moms.</p>

<style lang="scss">
	.details {
		max-width: 400px;
		font-size: 0.8;
	}

	button.product {
		all: unset;
		cursor: pointer;
		padding: .5em;
	}

	@media only screen and (max-width: 768px) {
		.hide-small {
			display: none;
		}

		table {
			font-size: 0.8em;
		}

		.table-scroll {
			margin: 0 -1em;
		}

		.details {
			font-size: 1em;
		}
	}

	.collapsable
	{
		display: none;
		&.open {
			display: block;
		}
	}

	.table-scroll {
		overflow-x: auto;
	}

	.chevron::before {
		border-style: solid;
		border-width: 0.25em 0.25em 0 0;
		content: '';
		display: inline-block;
		position: relative;
		
		vertical-align: top;
		width: 0.45em;
		height: 0.45em;
		

		left: -0.5em;
		top: 0.25em;
		transform: rotate(45deg);
	}

	.chevron.open::before{
		top: 0.25em;
		left: -0.4em;
		transform: rotate(135deg);
	}

	table {
		td {
			img.warning {
				padding-left: 0.5em;
			}
			&.amount {
				text-align: right;
				white-space: nowrap;
				vertical-align: top;
			}
		}
	}
</style>
