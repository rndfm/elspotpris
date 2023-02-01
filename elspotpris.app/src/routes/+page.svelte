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
		if (!value) return;

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
	let hideDiscountAgreements = true;

	let priceFormatter = new Intl.NumberFormat('da-DK', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 5
	}).format;

	function shouldWarn(product) {
		if (!product) return false;

		if (product.prices === null) return true;

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
				<span><small>Elprisen lige nu</small> {priceFormatter(spotPriceNow)} <small>kr</small></span
				>
			</div>
			<div class="col">
				<span><small>CO<sub>2</sub></small> {emisNow} <small>g/kWh</small></span>
			</div>
		</div>
		<Bars height={150} />
		<a href="/live">Vælg indstillinger og se beregningen</a>
	</div>

	<h2>Find det billigste elselskab for dig.</h2>
	<p class="lead">
		Sammenligning de reelle udgifter hos de største elselskaber i Danmark.<br />
	</p>
	<div class="box">
		<div class="flexgrid responsive">
			<div class="col">
				<h4>Vælg dit estimerede forbrug</h4>
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
				<h4>Filtre</h4>
				<p>
					<label for="monthlyPayment">
						<input id="monthlyPayment" type="checkbox" bind:checked={paymentTypeConsumptionOnly} />
						Vis kun forbrugsafregnede</label>
					<label for="hideDiscountAgreement">
						<input id="hideDiscountAgreement" type="checkbox" bind:checked={hideDiscountAgreements} />
						Vis ikke rabataftaler</label>
				</p>
			</div>
		</div>
	</div>
	<p>
		Der sammenlignes på <strong>spotpristillæg, abonnementspris og betalingsgebyrer</strong>.<br />
		Hvorfor det er vigtigt at sammenligne de reelle udgifter i stedet for en oplyst pris fra elselskabet,
		kan du læse om nederst på siden
	</p>
	{#if productCalculations}
		{#each productCalculations.filter((p) => (!paymentTypeConsumptionOnly || p.paymentType == 'consumption') && (!hideDiscountAgreements || p.discountAgreement !== true)) as item}
			<div class="box product" class:disabled={item.disabled}>
				<div class="flexgrid responsive">
					<div class="col information">
						{#if item.logo}
							<img src={item.logo} alt={item.name} />
						{/if}
						<h2 class:bigger={!item.logo}>
							{item.name}
							
							{#if shouldWarn(item)}<img
									class="warning"
									src="/warning.svg"
									alt="Advarsel"
									title="Der er bemærkninger til prisen. Klik for mere info."
									width="16"
									height="16"
								/>{/if}<br />
						</h2>
						{#if !item.disabled}
							<div class="pills">
								{#if item.bindingPeriod }
									<span class="bad">{item.bindingPeriod}</span>
								{:else if item.bindingPeriod === null}
									<span class="good">Ingen binding</span>
								{/if}
								{#if item.discountAgreement}
									<span class="neutral">Rabataftale</span>
								{/if}
								{#if item.paymentType == 'consumption'}
									<span class="good">Forbrugsafregnet</span>
								{/if}
								{#if item.paymentType == 'advance'}
									<span class="bad">Acontoafregnet</span>
								{/if}
							</div>
						{:else}
							<small>Kan ikke beregnes da {item.name} ikke oplyser deres priser.</small>
						{/if}
					</div>
					{#if !item.disabled}
					<div class="col details table-scroll">
						<ProductDetails product={item} />
					</div>
					{/if}
					<div class="col calculations">
						{#if !item.disabled}
							<small>Årlige omkostninger</small>
							<p class="lead">
								{round(item.calculatedPrices.total)} kr
							</p>
							<small>
								Tillæg til kWh: {round(item.calculatedPrices.surcharges)} kr<br />
								Abonnement og gebyrer: {round(item.calculatedPrices.fees)} kr
							</small>
							
							{#if item.link}<a class="cta" href={item.link} target="_blank" rel="noreferrer">Gå til produktet</a>{/if}
						{/if}
					</div>
				</div>
			</div>
		{/each}
	{/if}

	<p>
		Omkostningerne vises årligt for det valgte forbrug. Priser vises {#if withTax}inkl{:else}eksl{/if}.
		moms.<br>
		<small>Er du representant for et elselskab og vil du opdaterer dit produkt eller have dit produkt med i vores sammenligning, så kontakt os på <a href="mailto:info@elspotpris.dk">info@elspotpris.dk</a></small>
	</p>
	<div class="flexgrid responsive">
		<div class="col">
			<h3>Sådan sammenligner du elselskabernes variable priser</h3>
			<p>
				En variabel pris består af flere dele, nogle af dele er ens for alle elselskaber, mens andre
				er forskellige. Der giver derfor kun mening at sammenligne elselskaberne på de dele, som er
				forskellige.
			</p>

			<h4>Dele som er forskellige mellem elselskaberne:</h4>
			<ul>
				<li><strong>Abonnement</strong></li>
				<li><strong>Betalingsgebyrer</strong></li>
				<li><strong>Tillæg til spotprisen</strong></li>
			</ul>

			<h4>Dele som vil være uændret uanset hvilket elselskab du vælger:</h4>
			<ul>
				<li>
					<strong>Spotpris</strong> - Prisen baseres på elbørsen
					<a href="https://www.nordpoolgroup.com" target="_blank" rel="noreferrer">Nordpool</a>.
					Prisen varierer time for time, men er ens for alle elselskaber.
				</li>
				<li>
					<strong>Transport</strong> - Transporten betales til dit lokale netselskab, dem som ejer ledningerne
					i jorden. Transportprisen er derfor ens uanset hvilket elselskab du vælger.
				</li>
				<li>
					<strong>Afgift og transmission</strong> - Betales til staten og er ens uanset elselskab.
				</li>
			</ul>

			<p>
				Mange elselskaber ønsker ikke at oplyse deres tillæg til spotprisen, og der er intet i
				lovgivningen der tvinger dem til det.<br />
				Nogle bruger endda udtryk som "indkøbspris", "kostpris" eller "følger spotprisen" selvom de ligger
				avance oven på spotprisen.<br />
			</p>
			<p>
				Vi har derfor samlet denne liste, hvor vi har tillæggene til spotprisen, så elselskaberne
				kan sammenlignes på deres reelle priser.
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

	.product {
		margin-bottom: 2em;

		h2 {
			margin: 1em 0;
			font-size: 1.2em;
			&.bigger {
				margin: 0 0 1em 0;
				font-size: 2em;
			}
		}

		.col.information {
			position: relative;
			padding-bottom: 2em;
			
			.pills {
				position: absolute;
				bottom: 1em;
			}
		}

		.col.details {
			font-size: .8em;
			padding-bottom: 1em;
		}

		.calculations {
			@media only screen and (min-width: 1200px) {
				max-width: 220px;
			}
			
			p.lead {
				margin-top: 0;
				margin-bottom: .5em;
				font-size: 2em;
			}

			a.cta {
				display:block;
				text-align: center;
				background: #0a0;
				color: #fff;
				border: none;
				padding: 0.5em 1em;
				border-radius: 0.25em;
				text-decoration: none;
				margin: 1em 0;
			}
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

	div.content {
		margin: 0 auto;
		max-width: 1400px;
	}

	.pills > * {
		font-size: 0.8em;
		color: white;
		border-radius: 0.5em;
		padding: 0.25em 0.5em;

		&.good {
			background-color: #0a0;
		}
		&.bad {
			background-color: #b74932;
		}
		&.neutral {
			background-color: #06a;
		}
	}

	.table-scroll {
		overflow-x: auto;
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
	}
</style>
