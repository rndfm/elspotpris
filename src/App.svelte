<script>
	import { chart } from "svelte-apexcharts";
	import {
		priceNow,
		prices,
		co2EmissionNow,
		co2Emissions,
		co2EmissionsPrognosis,
		priceRegion,
		electricityTax,
		tax,
		tariff,
	} from "./stores.js";
	import {} from "./data.js";
	import { tariffs } from "./prices.js";

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
				stops: [50, 100],
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
		yaxis: [
			{
				opposite: true,
				labels: {
					formatter: function (value) {
						return Math.round(value * 100) / 100 + " kr";
					},
				},
			},
			{
				seriesName: "Co2",
				labels: {
					formatter: function (value) {
						return value + " g/kWh";
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

	let region;
	priceRegion.subscribe((value) => {
		region = value;
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
</script>

<main>
	<nav>
		<ul>
			<li>
				<label for="priceAreaDK1"
					><input
						id="priceAreaDK1"
						type="radio"
						bind:group={region}
						value="DK1"
						on:change={updateRegion}
					/> DK1(vest)</label
				>
				<label for="priceAreaDK2"
					><input
						id="priceAreaDK2"
						type="radio"
						bind:group={region}
						value="DK2"
						on:change={updateRegion}
					/> DK2(øst)</label
				>
			</li>
			<li>
				<label for="electricityTax">
					<input
						type="checkbox"
						id="electricityTax"
						bind:checked={$electricityTax}/> elafgift</label>
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
				<label for="tax"
					><input type="checkbox" id="tax" bind:checked={$tax} /> moms</label
				>
			</li>
			
		</ul>
	</nav>
	<div class="flexgrid meters">
		<div class="col">
			<h2>{spotPriceNow} <small>kr</small></h2>
			<p>Spotpris lige nu</p>
		</div>
		<div class="col">
			<h2>{emisNow} <small>g</small></h2>
			<p>Co2 lige nu</p>
			
		</div>
	</div>
	{#if options.series[0].data}
		<div use:chart={options} />
	{/if}
	<div class="info">
		<h1>elspotpris.dk</h1>
		<p class="lead">Få overblik over spot priserne på el det næste døgn.</p>
		<p>Har du en elaftale med variabel pris betaler du den pris pr. kWh som er fastsat dagen forinden ved Nordpool. Den såkaldte spotpris. Prisen for næste dag bliver frigivet omkring kl. 13.00.</p>
		<p>Vælg om prisen skal vises for DK1 eller DK2 som er henholdvis vest og øst for storebælt. Det vil sige at DK1 er Jylland og Fyn mens DK2 er Sjælland. Prisen i grafen kan vises med elafgift, tariffer/transport og moms.<br /> Alle indstillinger bliver husket til næste gang du besøger siden.</p>
	</div>
	<div class="github">
		<p>
			<img src="github.png" alt="github" />Hjælp med at forbedre denne
			side.
			<a href="https://github.com/rndfm/elspotpris" target="_blank"
				>https://github.com/rndfm/elspotpris</a
			>
		</p>
	</div>
</main>

<style>
	nav {
		overflow: auto;
		margin-bottom: 1em;
	}

	nav ul {
		display: block;
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: space-around;
	}

	nav ul li {
		padding: 10px;
		display: flex;
		align-items: center;
	}

	nav ul li label {
		margin-right: 10px;
	}

	nav ul li select {
		margin: 0;
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

	.meters p {
		padding: 0;
		margin: 0;
	}

	h1,
	h2 {
		color: #ff3e00;
		font-size: 3em;
		font-weight: 100;
		margin: 0;
		padding: 0;
	}

	h2 {
		font-size: 2em;
	}

	@media only screen and (min-width: 768px) {
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

	.info {
		max-width: 800px;
		margin: 0 auto;
	}
	.github {
		padding: 5em 0;
	}

	.github img {
		vertical-align: middle;
		padding-right: 10px;
	}
</style>
