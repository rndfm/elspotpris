<script>
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
		menuClosed,
		electricityTax,
	} from "./stores.js";
	import {} from "./data.js";
	import { tariffs, products, governmentTariffs } from "./prices.js";
	import { onMount } from 'svelte';
	import { intros } from "svelte/internal";

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

	let includeElectricityTax = false;
	electricityTax.subscribe((value) => {
    	includeElectricityTax = value;
	});

	let options = {
		series: [
			{
				name: "Spotpris",
				type: "area",
				data: null,
			},
			{
				name: "CO2",
				type: "line",
				data: null,
			},
			{
				name: "CO2 prognose",
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
			},
			animations: {
				enabled: false
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
					x: getDateInTimezone("Europe/Copenhagen").getTime(),
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
				seriesName: "CO2",
				labels: {
					offsetY:-10,
					formatter: function (value) {
						return value + " g";
					},
				},
			},
			{
				seriesName: "CO2",
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
		options.annotations.xaxis[0].x = getDateInTimezone("Europe/Copenhagen").getTime();
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

	function getDateInTimezone(timezone)
	{
		let nz_date_string = new Date().toLocaleString("en-US", { timeZone: timezone });
		// Date object initialized from the above datetime string
		const date = new Date(nz_date_string);
		date.timeZone = timezone;
		return date;
	}

	function onResize()
	{
		if (document.getElementById('options'))
		{
			// find height of options.
			const optionsHeight = document.getElementById('options').clientHeight - 30;
			const metersHeight = document.getElementById('meters').clientHeight;
			const offset = 40;
			var height = window.innerHeight - optionsHeight - metersHeight - offset;

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

	function shouldWarn(product)
	{
		if (!product)
		{
			return false;
		}
		return product.prices.some(p => p.conditions === null || p.calculated || p.amount === undefined) ||
			product.fees.some(f => f.amount === undefined || f.conditions === null);
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

<svelte:head>
	<title>elspotpris.dk - Se din elpris pr. kWh time for time - i dag og det næste døgn frem.</title>
	<meta name="description" content="Se elprisen inkl. transport tariffer, elafgift og moms i overskuelig graf så du kan planlægge dit strømforbrug. Se også nuværende og prognose for Co2 udledning.">
</svelte:head>

<svelte:window on:resize="{onResize}"/>
<nav id="options" class:closed="{$menuClosed}">
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
            <label for="electricityTax">
                <input
                    type="checkbox"
                    id="electricityTax"
                    bind:checked={$electricityTax}/> Elafgift</label>
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
                {#each products.sort((a, b) => a.name.localeCompare(b.name)) as product}
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
    <button class="tab" on:click="{() => $menuClosed = !$menuClosed}" aria-label="Åben og luk menu"><span class="chevron up"></span></button>
</nav>
<div class="flexgrid meters" id="meters">
    <div class="col">
        <h2>{spotPriceNow} <small>kr/kWh</small></h2>
        <p>Spotpris lige nu</p>
    </div>
    <div class="col">
        <h2>{emisNow} <small>g/kWh</small></h2>
        <p>CO<sub>2</sub> lige nu</p>
    </div>
</div>
{#if options.series[0].data}
    <div use:chart={options} />
{/if}
<div class="flexgrid responsive">
    <div class="info col">
        <h1>elspotpris.dk</h1>
        <p class="lead">Få overblik over spotpriserne på el det næste døgn.</p>
        <p>Har du en elaftale med variabel pris, er din pris pr. kWh baseret på spotprisen ved <a href="https://www.nordpoolgroup.com" target="_blank">Nordpool</a>.<br>
            Prisen for næste dag bliver frigivet omkring kl. 13.00.</p>
        <p>Vælg om prisen skal vises for DK1 eller DK2, som er henholdvis vest og øst for storebælt. DK1 er Jylland og Fyn, mens DK2 er Sjælland. Prisen i grafen kan vises med elafgift, tariffer/transport og moms.<br /> Alle indstillinger bliver husket til næste gang, du besøger siden.</p>
        <h3>Variabel pris &#8800; spotpris</h3>
        <p>Bemærk at indkøbsprisen/kostprisen i din elaftale med variabel pris som regel er baseret på spotprisen, men tillægges fortjeneste med mere.<br />
            Vælg et produkt i menuen øverst for at se prisen med alle tillæg.<br />Bemærk at priser på produkter vedligeholdes manuelt. Hvis dit produkt mangler, eller det er udregnet forkert, så opret et punkt på <a href="https://github.com/rndfm/elspotpris/issues/new/choose" target="_blank">github</a>.
            Der garanteres ikke for korrektheden af udregningen på produkterne, og elselskaberne kan i mange tilfælde ændre prisen uden varsel.
        </p>
        
    </div>
    {#if selectedProduct }
    <div class="calculation col">
        <a id="info"><h2>
            {#if shouldWarn(selectedProduct)}<img src="warning.svg" width="32" height="32" class="warning" alt="Advarsel" title="Dele af udregningen er ugarranteret eller uden betingelser."/>{/if}
            Sådan er prisen udregnet
        </h2></a>
        <p class="lead">{selectedProduct.name}</p>
        {#if selectedProduct.link}<a href={selectedProduct.link}>{selectedProduct.link}</a>{/if}
        <ul>
        {#each selectedProduct.prices as item}
            <li>
                {item.name}{#if item.region != undefined}&nbsp;{item.region}{/if}{#if item.amount != undefined}&nbsp;- {item.amount} kr{/if}
                {#if item.calculated}<img class="item-warning" src="warning.svg" alt="Advarsel" title="Prisen er regnet baglens og er ikke bekræftet af elselskabet." width="16" height="16">{/if}
                {#if item.conditions === null}<img class="item-warning" src="warning.svg" alt="Advarsel" title="Denne pris er uden betingelser fra elselskabet. Elselskabet kan ændre prisen uden varsel" width="16" height="16">{/if}
                {#if item.conditions}<img class="item-warning" src="info.svg" alt="Info" title="{item.conditions}" width="16" height="16">{/if}
                {#if item.amount === undefined}<img class="item-warning" src="warning.svg" alt="Advarsel" title="Denne pris er ukendt" width="16" height="16">{/if}
            </li>
        {/each}
        </ul>
        <ul>
        {#if includeElectricityTax}
        {#each governmentTariffs as item}
            <li>
                {item.name}{#if item.amount != undefined}&nbsp;- {item.amount} kr{/if}
            </li>
        {/each}
        {/if}
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
                {#if item.conditions === null}<img class="item-warning" src="warning.svg" alt="Advarsel" title="Denne pris er uden betingelser fra elselskabet. Elselskabet kan ændre prisen uden varsel" width="16" height="16">{/if}
                {#if item.amount === undefined}<img class="item-warning" src="warning.svg" alt="Advarsel" title="Denne pris er ukendt" width="16" height="16">{/if}
				{#if item.paymentsPerYear}<small>({item.paymentsPerYear} betalinger om året)</small>{/if}
            </li>
            {/each}
        </ul>
        {/if}
        <p>Priserne i udregningen er opgivet ex. moms.<br/>Er der fejl i udregningen eller satserne rapporteres dette her: <a href="https://github.com/rndfm/elspotpris/issues/new/choose" target="_blank">github</a>.</p>
    </div>
    {/if}
</div>
<div class="github">
    <p>
        {#if $darkMode}<img src="github-dark.png" alt="github" width="32" height="32" />{:else}<img src="github.png" alt="github" width="32" height="32"/>{/if}Hjælp med at forbedre denne side.
        <a href="https://github.com/rndfm/elspotpris" target="_blank">https://github.com/rndfm/elspotpris</a>
    </p>
</div>

<style lang="scss">
	nav#options {
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
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			
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
				top: -10px;
				.chevron:before {
					top: 0;
					transform: rotate(135deg);
				}
			}
		}

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
		overflow-x: auto;
		> * {
			margin: 1em;
		}
		p {
			padding: 0;
			margin: 0;
		}

		h2 {
			font-weight: 400;
		}

		.col
		{
			text-align: center;
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
