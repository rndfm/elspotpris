<script>
	import { chart } from "svelte-apexcharts";
	import { priceNow, prices, co2EmissionNow, co2Emissions, co2EmissionsPrognosis, priceRegion, electricityTax, tax, tariff} from "./stores.js"
	import {} from "./data.js";
	
	let options = {
		series: [
			{
				name: "Spot price",
				type: "area",
				data: null
			},
			{
				name: "Co2",
				type: 'line',
				data: null
			},
			{
				name: "Co2 prognosis",
				type: 'line',
				data: null
			}
		],
		colors:['#ff3e00', '#4DEBC6', '#4DEBC6'],
		chart: {
			type: "line",
			height: 500
		},
		stroke: {
			curve: ['stepline','smooth', 'smooth'],
			width:[0,3,3],
			dashArray: [0,0,5]
		},
		fill: {
			colors:["#7BC17E","#000000","#000000"],
			type: ['gradient','solid','solid'],
			gradient: {
				type: "vertical",
				gradientToColors: ["#ff3e00","#ff3e00","#ff3e00"],
				
				opacityFrom: 0.8,
				opacityTo: 0.8,
				stops: [50, 100]
			}
		},
		annotations: {
			xaxis: [
				{
					x: new Date().getTime(),
					borderColor: '#333333',
					strokeDashArray: 5,
					borderWidth: 3,
					label: {
						orientation: "horizontal",
						style: {
							color: '#FFF',
							fontSize: 18,
							background: "#333333"
						},
						text: 'Lige nu'
					}
				}
			]
		},
		xaxis: {
			type: 'datetime',
			labels:
			{
				datetimeUTC: false
			}
		},
		yaxis: [
			{
				opposite: true,
				labels: {
					formatter: function (value) {
     					return (Math.round(value * 100) / 100) + " DKK/kWh";
    				}
				}
			},
			{
				seriesName: "Co2",
				labels: {
					formatter: function (value) {
     					return value + " g/kWh";
    				}
				}
			},
			{
				seriesName: "Co2",
				show: false
			}			
		],
		tooltip: {
			x: {
				format: "d. MMMM HH:mm"
			}
		},
		dataLabels: {
			enabled: false,
		},
	};

	let region;
	priceRegion.subscribe(value => {
		region = value;
	});

	function updateRegion()
	{
		priceRegion.set(region);
	}

	let spotPriceNow;

	priceNow.subscribe(value => {
		spotPriceNow = value;
	});

	let emisNow;

	co2EmissionNow.subscribe(value => {
		emisNow = value;
	});

	prices.subscribe(value => {
		options.series[0].data = value;
	});

	co2Emissions.subscribe(value => {
		options.series[1].data = value;
	});

	co2EmissionsPrognosis.subscribe(value => {
		options.series[2].data = value;
	});
</script>
<main>
	<nav>
		<ul>
			<li><label for="electricityTax"><input type="checkbox" id="electricityTax" bind:checked="{$electricityTax}"> elafgift</label></li>
			<li><label for="tariff"><input type="checkbox" id="tariff" bind:checked="{$tariff}"> nettarif(radius)</label></li>
			<li><label for="tax"><input type="checkbox" id="tax" bind:checked="{$tax}"> moms</label></li>
			<li><label for="priceAreaDK1"><input id="priceAreaDK1" type="radio" bind:group={region} value="DK1" on:change={updateRegion}> DK1</label> <label for="priceAreaDK2"><input id="priceAreaDK2" type="radio" bind:group={region} value="DK2" on:change={updateRegion}> DK2</label></li>
		</ul>
	</nav>
		<div class="flexgrid meters">
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
</main>

<style>
	nav ul {
		display: block;
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
	}

	nav ul li {
		padding: 10px;
		display: flex;
	}

	nav ul li label {
		margin-right: 10px;
	}
	main {
		text-align: center;
		padding: 0;
		margin: 0 auto;
	}

	.flexgrid {
		display: flex;
	}

	.meters p {
		padding: 0;
		margin:0;
	} 

	h1,h2 {
		color: #ff3e00;
		font-size: 4em;
		font-weight: 100;
		margin: 0;
		padding: 0;
	}

	h2 
	{
		font-size: 3em;
	}

	.col {
		flex: 1;
	}
</style>