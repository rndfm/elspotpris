<script>
	import "./global.scss";
	import { chart } from "svelte-apexcharts";
	import {
		priceNow,
		prices,
		co2EmissionNow,
		co2Emissions,
		co2EmissionsPrognosis,
		priceRegion,
		tax,
		tariff,
		product,
		darkMode,
		menuClosed
	} from "./stores.js";
	import {} from "./data.js";
	import { tariffs, products, governmentTariffs } from "./prices.js";
	import { onMount } from 'svelte';

	let selectedProduct;
	product.subscribe((value) => {
    	selectedProduct = value;
	});

	let selectedTariff;
	tariff.subscribe((value) => {
    	selectedTariff = value;
	});

	let withTax;
	tax.subscribe((value) => {
    	withTax = value;
	});

	let options = {
		series: [
			{
				name: "Spot price",
				type: "area",
				data: null,
			},
			{
				name: "Co2",
				type: "line",
				data: null,
			},
			{
				name: "Co2 prognosis",
				type: "line",
				data: null,
			},
		],
		colors: ["#ff3e00", "#4DEBC6", "#4DEBC6"],
		chart: {
			foreColor: '#bbb',
			type: "line",
			height: 500,
			toolbar: {
				show: false
			}
		},
		stroke: {
			curve: ["stepline", "smooth", "smooth"],
			width: [0, 3, 3],
			dashArray: [0, 0, 5],
		},
		fill: {
			colors: ["#7BC17E", "#000000", "#000000"],
			type: ["gradient", "solid", "solid"],
			gradient: {
				type: "vertical",
				gradientToColors: ["#ff3e00", "#ff3e00", "#ff3e00"],

				opacityFrom: 0.8,
				opacityTo: 0.8,
				stops: [15, 80],
			},
		},
		annotations: {
			xaxis: [
				{
					x: new Date().getTime(),
					borderColor: "#333333",
					strokeDashArray: 5,
					borderWidth: 3,
					label: {
						orientation: "horizontal",
						style: {
							color: "#FFF",
							fontSize: 18,
							background: "#333333",
						},
						text: "Lige nu",
					},
				},
			],
		},
		xaxis: {
			type: "datetime",
			labels: {
				datetimeUTC: false,
			},
		},
		grid: {
			padding: {
				left: -50,
				right: -50
			},
		},
		yaxis: [
			{
				opposite: true,
				labels: {
					offsetY:-10,
					formatter: function (value) {
						return Math.round(value * 100) / 100 + " kr";
					},
				},
			},
			{
				seriesName: "Co2",
				labels: {
					offsetY:-10,
					formatter: function (value) {
						return value + " g";
					},
				},
			},
			{
				seriesName: "Co2",
				show: false,
			},
		],
		tooltip: {
			x: {
				format: "d. MMMM HH:mm",
			},
		},
		dataLabels: {
			enabled: false,
		},
	};

	setInterval(() => {
		options.annotations.xaxis[0].x = new Date().getTime();
	}, 10000);

	setInterval(() => {
		gtag('event', 'keepalive');
	}, 240000);
	
	let region;
	priceRegion.subscribe((value) => {
		region = value;
	});

	darkMode.subscribe((value) => {
		if (value)
		{
			document.body.classList.add('dark')
			options.chart.foreColor = '#bbb';
		}
		else
		{
			document.body.classList.remove('dark')
			options.chart.foreColor = '#333';
		}
	});

	function updateRegion() {
		priceRegion.set(region);
	}

	let spotPriceNow;

	priceNow.subscribe((value) => {
		spotPriceNow = value;
	});

	let emisNow;

	co2EmissionNow.subscribe((value) => {
		emisNow = value;
	});

	prices.subscribe((value) => {
		options.series[0].data = value;
	});

	co2Emissions.subscribe((value) => {
		options.series[1].data = value;
	});

	co2EmissionsPrognosis.subscribe((value) => {
		options.series[2].data = value;
	});

	
	function onResize()
	{
		if (document.getElementById('nav'))
		{
			// find height of nav.
			const navHeight = document.getElementById('nav').clientHeight - 30;
			const metersHeight = document.getElementById('meters').clientHeight;
			const offset = 40;
			var height = window.innerHeight - navHeight - metersHeight - offset;

			if (height > 500)
			{
				height = 500;
			}

			if (height < 200)
			{
				height = 200;
			}
			options.chart.height = height;
		}
	}

	menuClosed.subscribe(() => {
		setTimeout(() => {
			onResize();	
		}, 500);
	});

	onMount(() => {
		onResize();
	});
</script>

<svelte:window on:resize="{onResize}"/>
<main>
	<nav id="nav" class:closed="{$menuClosed}">
		<ul>
			<li>
				<label for="priceAreaDK1">
					<input
						id="priceAreaDK1"
						type="radio"
						bind:group={region}
						value="DK1"
						on:change={updateRegion}/> DK1(vest)</label>
				<label for="priceAreaDK2">
					<input
						id="priceAreaDK2"
						type="radio"
						bind:group={region}
						value="DK2"
						on:change={updateRegion}/> DK2(øst)</label>
			</li>
			<li>
				<select bind:value={$tariff}>
					{#each tariffs as item}
						<option value={item}>
							{item.name}
						</option>
					{/each}
				</select>
			</li>
			<li>
				<select bind:value={$product}>
					{#each products as product}
						<option value={product}>
							{product.name}
						</option>
					{/each}
				</select>
			</li>
			<li>
				<label for="tax"><input type="checkbox" id="tax" bind:checked={$tax} /> Moms</label>
			</li>
			<li>
				<label for="darkMode"><input type="checkbox" id="darkMode" bind:checked={$darkMode} /> Dark mode</label>
			</li>
		</ul>
		<button class="tab" on:click="{() => $menuClosed = !$menuClosed}"><span class="chevron up"></span></button>
	</nav>
	<div class="flexgrid meters" id="meters">
		<div class="col">
			<h2>{spotPriceNow} <small>kr/kWh</small></h2>
			<p>Spotpris lige nu</p>
		</div>
		<div class="col">
			<h2>{emisNow} <small>g/kWh</small></h2>
			<p>Co2 lige nu</p>
		</div>
	</div>
	{#if options.series[0].data}
		<div use:chart={options} />
	{/if}
	<div class="flexgrid responsive">
		{#if selectedProduct }
		<div class="calculation col">
			<h2>
				{#if selectedProduct.prices.some(e => e.conditions === null | e.calculated || e.amount === undefined)}<img src="warning.svg" class="warning" alt="Advarsel" title="Dele af udregningen er ugarranteret eller uden betingelser."/>{/if}
				Sådan er prisen udregnet.
			</h2>
			<p class="lead">{selectedProduct.name}</p>
			{#if selectedProduct.link}<a href={selectedProduct.link}>{selectedProduct.link}</a>{/if}
			<ul>
			{#each selectedProduct.prices as item}
				<li>
					{item.name}{#if item.region != undefined}&nbsp;{item.region}{/if}{#if item.amount != undefined}&nbsp;- {item.amount} kr{/if}
					{#if item.calculated}<img class="item-warning" src="warning.svg" alt="Advarsel" title="Prisen er regnet baglens og er ikke bekræftet af elselskabet.">{/if}
					{#if item.conditions === null}<img class="item-warning" src="warning.svg" alt="Advarsel" title="Denne pris er uden betingelser fra elselskabet. Elselskabet kan ændre prisen uden varsel">{/if}
					{#if item.conditions}<img class="item-warning" src="info.svg" alt="Info" title="{item.conditions}">{/if}
					{#if item.amount === undefined}<img class="item-warning" src="warning.svg" alt="Advarsel" title="Denne pris er ukendt">{/if}
				</li>
			{/each}
			</ul>
			<ul>
			{#each governmentTariffs as item}
				<li>
					{item.name}{#if item.amount != undefined}&nbsp;- {item.amount} kr{/if}
				</li>
			{/each}
				<li>Netselskab - { selectedTariff.name } - lavlast: {selectedTariff.normal} kr - spidslast: {selectedTariff.peak} kr</li>
				{#if withTax}<li>Moms 25%</li>{/if}
				{#if !withTax}<li>Uden moms</li>{/if}
			</ul>
			{#if selectedProduct.fees}
			<p>Ud over prisen pr. kWh er der følgende udgifter ved {selectedProduct.name}</p>
			<ul>
				{#each selectedProduct.fees as item}
				<li>
					{item.name}{#if item.amount != undefined}&nbsp;- {item.amount} kr{/if}
					{#if item.calculated}<img class="item-warning" src="warning.svg" alt="Advarsel" title="Prisen er regnet baglens og er ikke bekræftet af elselskabet.">{/if}
					{#if item.conditions === null}<img class="item-warning" src="warning.svg" alt="Advarsel" title="Denne pris er uden betingelser fra elselskabet. Elselskabet kan ændre prisen uden varsel">{/if}
					{#if item.amount === undefined}<img class="item-warning" src="warning.svg" alt="Advarsel" title="Denne pris er ukendt">{/if}
				</li>
				{/each}
			</ul>
			{/if}
			<p>Priserne i udregningen er opgivet ex. moms.<br/>Er der fejl i udregningen eller satserne rapporteres dette her: <a href="https://github.com/rndfm/elspotpris/issues/new/choose" target="_blank">github</a>.</p>
		</div>
		{/if}
		<div class="info col">
			<h1>elspotpris.dk</h1>
			<p class="lead">Få overblik over spot priserne på el det næste døgn.</p>
			<p>Har du en elaftale med variabel pris er din pris pr. kWh baseret på spotprisen ved <a href="https://www.nordpoolgroup.com" target="_blank">Nordpool</a>.<br>
				Prisen for næste dag bliver frigivet omkring kl. 13.00.</p>
			<p>Vælg om prisen skal vises for DK1 eller DK2 som er henholdvis vest og øst for storebælt. DK1 er Jylland og Fyn mens DK2 er Sjælland. Prisen i grafen kan vises med elafgift, tariffer/transport og moms.<br /> Alle indstillinger bliver husket til næste gang du besøger siden.</p>
			<h3>Variabel pris &#8800; spotpris</h3>
			<p>Bemærk at indkøbsprisen/kostprisen, i din elaftale med variable pris, som regel er baseret på spotprisen men tillægges fortjeneste med mere.<br />
				Vælg et produkt i menuen øverst for at se prisen med alle tillæg.<br />Bemærk at priser på produkter vedligeholdes manuelt. Hvis dit produkt mangler eller det er udregnet forkert så opret et punkt på <a href="https://github.com/rndfm/elspotpris/issues/new/choose" target="_blank">github</a>.
				Der garanteres ikke for korrektheden af udregningen på produkterne og elselskaberne kan i mange tilfælde ændre prisen uden varsel.
			</p>
			
		</div>
	</div>
	<div class="github">
		<p>
			{#if $darkMode}<img src="github-dark.png" alt="github" />{:else}<img src="github.png" alt="github" />{/if}Hjælp med at forbedre denne side.
			<a href="https://github.com/rndfm/elspotpris" target="_blank">https://github.com/rndfm/elspotpris</a>
		</p>
	</div>
</main>

<style lang="scss">
	nav {
		margin-bottom: -20px;

		> ul {
			overflow-x: auto;
			overflow-y: hidden;
			display: block;
			list-style: none;
			margin: 0;
			padding: 0;
			display: flex;
			max-height: 200px;
			transition: max-height 0.15s ease-out;
			
			@media only screen and (min-width: 768px) {
				justify-content: center;
			}

			> li {
				padding: 10px 10px 0 10px;
				display: flex;
				align-items: center;
				

				> label {
					margin-right: 10px;
				}

				> select {
					margin: 0;
				}
			}
		}

		.tab {
			display: block;
			position: relative;
			border: none;
			border-bottom-left-radius: 33%;
			border-bottom-right-radius: 33%;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
			margin: 0 auto;
			width: 50px;
			height: 30px;
			cursor: pointer;

			.chevron::before {
				border-style: solid;
				border-width: 0.25em 0.25em 0 0;
				content: '';
				display: inline-block;
				height: 0.45em;
				position: relative;
				top: 0.15em;
				transform: rotate(-45deg);
				vertical-align: top;
				width: 0.45em;
			}
		}

		&.closed {
			ul {
				max-height: 0px;
				overflow: hidden;
			}
			.tab {
				.chevron:before {
					top: 0;
					transform: rotate(135deg);
				}
			}
		}

	}

	main {
		text-align: center;
		padding: 0;
		margin: 0 auto;
	}

	p.lead {
		font-size: 1.4em;
	}

	.flexgrid {
		display: flex;
	}

	@media (max-width: 1000px) {
		.flexgrid.responsive {
			display: block;
		}
	}

	.meters {
		p {
			padding: 0;
			margin: 0;
		}

		h2 {
			font-weight: 400;
		}
	}

	small {
		font-size: .5em;
	}

	h1,	h2 {
		color: #ff3e00;
		font-size: 3em;
		font-weight: 100;
		margin: 0;
		padding: 0;
	}

	h2 {
		font-size: 2em;
	}

	h3 {
		margin-bottom: -.5em;
	}

	@media only screen and (min-width: 500px) {
		h1 {
			font-size: 4em;
		}
		h2 {
			font-size: 3em;
		}
	}

	.col {
		flex: 1;
	}

	.calculation {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 1em;

		.warning {
			width: 32px;
			padding-right: 10px;
		}
		ul {
			text-align: left;
			.item-warning
			{
				width: 16px;
				padding-left: .5em;
			}
		}
	}

	.info {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 1em;
	}

	.github {
		padding: 5em 1em;

		img {
			vertical-align: middle;
			padding-right: 10px;
		}
	}
</style>
