<script context="module">
	export const ssr = false;
</script>

<script>
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte'
	import ApexCharts from "apexcharts?client";
    import { chart } from "svelte-apexcharts?client";
    import {
		prices,
		co2Emissions,
		co2EmissionsPrognosis,
		darkMode,
		legendsEnabled,
	} from "../routes/stores.js";

    export let height = 500;

    $: {
        options.chart.height = height;
    }

	onDestroy( () => {
		if (browser)
			ApexCharts.exec(chartId, 'destroy');
    })

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
			id: chartId,
			foreColor: '#bbb',
			type: "line",
			height: height,
			toolbar: {
				show: false
			},
			animations: {
				enabled: false
			},
			events: {
				legendClick: function(_, seriesIndex, config) {
					let legendsEnabledValues = {};

					for (let i = 0; i < config.config.series.length; i++) {
						const seriesName = config.config.series[i].name
						let isHidden = apexChartsIsSeriesHidden(seriesName);
						// If it is the clicked series we are reading out, the returned value is inverted
						// because the event is fired before the state is written.
						isHidden = seriesIndex == i ? !isHidden : isHidden;
						legendsEnabledValues[seriesName] = !isHidden;
					}

					legendsEnabled.set(legendsEnabledValues);
				},
				mounted: () => {
					legendsEnabled.subscribe((value) => {
						for (const seriesName in value) {
							ApexCharts.exec(chartId, value[seriesName] ? 'showSeries' : 'hideSeries', seriesName);
						}
					});
				},
			},
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
    
    const chartId = 'elSpotPrisChart';

	// Duplicated internal functions from Apex Charts to support finding the shwon state of a series
	// https://github.com/apexcharts/apexcharts.js/blob/ff248b4a38ee21e993e38ef9a3e1318e59a6ea32/src/utils/Utils.js#L305
	function apexChartsEscapeString(str) {
		return str.toString().slice().replace(/[` ~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, 'x');
  	}

	// https://github.com/apexcharts/apexcharts.js/blob/ff248b4a38ee21e993e38ef9a3e1318e59a6ea32/src/modules/Series.js#L22
	function apexChartsGetSeriesByName(seriesName) {
		return document.querySelector(`.apexcharts-inner .apexcharts-series[seriesName='${apexChartsEscapeString(seriesName)}']`);
	}
	
	// https://github.com/apexcharts/apexcharts.js/blob/ff248b4a38ee21e993e38ef9a3e1318e59a6ea32/src/modules/Series.js#L30
	function apexChartsIsSeriesHidden(seriesName) {
		const targetElement = apexChartsGetSeriesByName(seriesName);
		let isHidden = targetElement.classList.contains('apexcharts-series-collapsed');

		return isHidden;
  	}

    setInterval(() => {
		options.annotations.xaxis[0].x = getDateInTimezone("Europe/Copenhagen").getTime();
	}, 10000);

    darkMode.subscribe((value) => {
		if (value)
		{
			options.chart.foreColor = '#bbb';
		}
		else
		{
			options.chart.foreColor = '#333';
		}
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
</script>

{#if options.series[0].data}
    <div use:chart={options} />
{/if}