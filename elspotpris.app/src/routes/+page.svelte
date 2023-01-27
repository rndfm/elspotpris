<script>
	import {
		priceNow,
		co2EmissionNow,
		transportNow,
		consumption, 
		customConsumption, 
		calculatedProducts,
		tax
	} from '../stores.js';
	
	import { consumptionTypes } from '../prices.js';
	import {} from '../data.js';
	import ProductDetails from '../lib/ProductDetails.svelte';
	import Bars from '../lib/Bars.svelte';

	let productCalculations;
	calculatedProducts.subscribe((value) => {
		if (!value)
			return;

		productCalculations = value;
		productCalculations.sort((a, b) => {
			if (a.calculatedPrices.total === b.calculatedPrices.total) return 0;
			if (a.calculatedPrices.total === NaN) return 1;
			if (b.calculatedPrices.total === NaN) return -1;
			return a.calculatedPrices.total < b.calculatedPrices.total ? -1 : 1;
		});
	});

	let spotPriceNow;
	priceNow.subscribe((value) => {
		spotPriceNow = value;
	});

	let tariffNow;
	transportNow.subscribe((value) => {
		tariffNow = value;
	});

	let withTax;
	tax.subscribe((value) => {
		withTax = value;
	});

	let emisNow;

	co2EmissionNow.subscribe((value) => {
		emisNow = value;
	});

	function round(amount) {
		return (Math.round((amount + Number.EPSILON) * 100) / 100).toFixed(2);
	}

	let paymentTypeConsumptionOnly = false;

	let priceFormatter = new Intl.NumberFormat('da-DK', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 5
	}).format;

	function shouldWarn(product) {
		if (!product)
			return false;
		
		if (product.prices === null)
			return true;

		return (
			product.prices.some(
				(p) => p.conditions === null || p.conditions || p.calculated || p.amount === undefined
			) || product.fees.some((f) => f.amount === undefined || f.conditions === null || f.conditions)
		);
	}
</script>

<svelte:head>
	<title>elspotpris.dk - Find det elselskab der reelt er billigst for dig.</title>
	<meta
		name="description"
		content="Sammenlign på de reelle udgifter hos elselskaberne. Se alle spotpristillæg, abonnement, betalingsgebyrer mv."
	/>
</svelte:head>
<div class="content">
	<h1>elspotpris.dk</h1>
	<div class="box">
		<div class="flexgrid meters" id="meters">
			<div class="col">
				<span><small>Elprisen lige nu</small> {priceFormatter(spotPriceNow)} <small>kr</small></span>
			</div>
			<div class="col">
				<span><small>CO<sub>2</sub></small> {emisNow} <small>g/kWh</small></span>
			</div>
		</div>
		<Bars height={150} />
		<a href="/live">Vælg indstillinger og se beregningen</a>
	</div>

	<h2>Find det billigste elselskab for dig.</h2>
	<p>
		Herunder kan du se en sammenligning af de reelle udgifter hos de største elselskaber i Danmark.<br>
	</p>
	<p>
		Der sammenlignes kun på <strong>spotpristillæg, abonnementspris og betalingsgebyrer</strong>.
	</p>
	<div class="box">
		<div class="flexgrid responsive">
			<div class="col">
				<h3>Vælg dit estimerede forbrug</h3>
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
			</div>
			<div class="col">
				<h3>Filtre</h3>
				<p>
					<label for="monthlyPayment"><input id="monthlyPayment" type="checkbox" bind:checked={paymentTypeConsumptionOnly} /> Vis kun forbrugsafregnede</label>
				</p>
			</div>
		</div>
	</div>
	{#if productCalculations}
		<div class="table-scroll">
			<table>
				<thead>
					<tr><td>Produkt</td><td class="right hide-small">kWh tillæg</td><td class="right hide-small">Abonnement & gebyrer</td><td class="right">Årlige omkostninger<br><small>(eksl. elpris)</small></td></tr>
				</thead>
				{#each productCalculations.filter(p => !paymentTypeConsumptionOnly || p.paymentType == "consumption") as item}
					<tr class:disabled={item.disabled}>
						<td><button class="product" on:click={() => (item.open = !item.open)}
								><span class="chevron" class:open={item.open} />{item.name} {#if shouldWarn(item)}<img
										class="warning"
										src="/warning.svg"
										alt="Advarsel"
										title="Der er bemærkninger til prisen. Klik for mere info."
										width="16"
										height="16"
									/>{/if}</button>
							<div class="collapsable details" class:open={item.open}>
								<ProductDetails product={item}></ProductDetails>
							</div>
						</td>
						{#if item.prices === null}
						<td class="amount"></td>
						<td colspan="2" class="amount hide-small"><small>Kan ikke beregnes da {item.name} ikke oplyser deres reelle priser.</small></td>
						{:else}
						<td class="amount hide-small">{round(item.calculatedPrices.surcharges)} kr</td>
						<td class="amount hide-small">{round(item.calculatedPrices.fees)} kr</td>
						<td class="amount"><strong>{round(item.calculatedPrices.total)} kr</strong></td>
						{/if}
					</tr>
				{/each}
			</table>
		</div>
	{/if}
	
	<p>Omkostningerne vises årligt for det valgte forbrug. Priser vises {#if withTax}inkl{:else}eksl{/if}. moms.</p>
	<div class="flexgrid responsive">
		<div class="col">
			<h3>Sådan sammenligner du elselskabernes variable priser</h3>
			<p>En variabel pris består af flere dele, nogle af dele er ens for alle elselskaber, mens andre er forskellige. Der giver derfor kun mening at sammenligne elselskaberne på de dele, som er forskellige.</p>
			
			<h4>Dele som er forskellige mellem elselskaberne:</h4>
			<ul>
			  <li><strong>Abonnement</strong></li>
			  <li><strong>Betalingsgebyrer</strong></li>
			  <li><strong>Tillæg til spotprisen</strong></li>
			</ul>
			
			<h4>Dele som vil være uændret uanset hvilket elselskab du vælger:</h4>
			<ul>
			  <li><strong>Spotpris</strong> - Prisen baseres på elbørsen <a href="https://www.nordpoolgroup.com" target="_blank" rel="noreferrer">Nordpool</a>. Prisen varierer time for time, men er ens for alle elselskaber.</li>
			  <li><strong>Transport</strong> - Transporten betales til dit lokale netselskab, dem som ejer ledningerne i jorden. Transportprisen er derfor ens uanset hvilket elselskab du vælger.</li>
			  <li><strong>Afgift og transmission</strong> - Betales til staten og er ens uanset elselskab.</li>
			</ul>
			
			<p>
				Mange elselskaber ønsker ikke at oplyse deres tillæg til spotprisen, og der er intet i lovgivningen der tvinger dem til det.<br>
				Nogle bruger endda udtryk som "indkøbspris", "kostpris" eller "følger spotprisen" selvom de ligger avance oven på spotprisen.<br>
			</p>
			<p>
				Vi har derfor samlet denne liste, hvor vi har tillæggene til spotprisen, så elselskaberne kan sammenlignes på deres reelle priser.
			</p>		
		</div>
	</div>
</div>

<style lang="scss">
	table {
		tr.disabled {
			opacity: 0.5;
			td {
				padding: 0.2em 1em;
			}
		} 
		margin-top: 1em;
		td.amount {
			text-align: right;
			white-space: nowrap;
		}
		th {
			padding: 2em 1em 1em 1em;
			text-align: left;
		}
	}

	.flexgrid {
		display: flex;
	
		&.responsive {
			display: block;
			margin: 0 -1em;

			.col {
				flex: 1;
				padding: 0 1em;
			}
		}
	}

	@media only screen and (min-width: 1200px) {
		.flexgrid.responsive {
			display: flex;
		}
	}

	.meters {
		overflow-x: auto;

		> * {
			margin: 0em 1em 0 0;
		}

		span {
			font-size: 1em;
		}

		p {
			padding: 0;
			margin: 0;
		}

		@media only screen and (min-width: 1200px) {
			justify-content: space-around;
			span {
				font-size: 1.5em;
			}
		}
	}

	.calculation {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 1em;

		.warning {
			width: 32px;
			padding-right: 10px;
		}
	}

	div.content {
		margin: 0 auto;
		max-width: 1400px;
	}

	div.box {
		margin: 1em 0;
		border: #eee 1px solid;
		padding: 1em;
	}

	.collapsable
	{
		display: none;
		&.open {
			display: block;
		}
	}

	.details {
		max-width: 400px;
		font-size: 0.8;
	}

	button.product {
		all: unset;
		cursor: pointer;
		padding: .5em;
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
