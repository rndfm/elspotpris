
<script>
	import { chart } from "svelte-apexcharts";
	
	const apiUrl = 'https://data-api.energidataservice.dk/v1/graphql';
	let axisOptions = {
		xIsSeries:1
	};

	var priceNow;
	var co2Now;

	const elspotprices = (async () => {
		const query = `
			query Dataset($startDate: timestamptz!) {
				elspotprices(where:{HourUTC: {_gte: $startDate}PriceArea: {_eq: \"DK2\"}}) {
					HourUTC
					HourDK
					PriceArea
					SpotPriceDKK
				}
			}
		`;

		var startDate = new Date();
		startDate.setHours(startDate.getHours() - 24);

		const variables = { "startDate": startDate };
		const response = await fetch(apiUrl,
		{
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				query: query,
				variables: variables,
				operationName: 'Dataset'
			})
		});
		const responseJson = await response.json();
		if (responseJson.data && responseJson.data.elspotprices && responseJson.data.elspotprices.length > 0)
		{
			var now = new Date();
			now.setMinutes(0);
			now.setSeconds(0);
			now.setMilliseconds(0);
			console.log(now);
			var price = responseJson.data.elspotprices.filter(x => new Date(x.HourUTC) >= now)[0];
			priceNow = Math.round((price.SpotPriceDKK / 1000 + Number.EPSILON) * 100) / 100;
			console.log(price);
		}
		return responseJson.data.elspotprices;
	});

	const co2emis = (async () => {
		const query = `
			query Dataset($startDate: timestamptz!) {
				co2emis(where:{Minutes5UTC: {_gte: $startDate}PriceArea: {_eq: \"DK2\"}}) {
					Minutes5UTC
					Minutes5DK
					PriceArea
					CO2Emission
				}
			}
		`;

		var startDate = new Date();
		startDate.setHours(startDate.getHours() - 24);

		const variables = { "startDate": startDate };
		const response = await fetch(apiUrl,
		{
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				query: query,
				variables: variables,
				operationName: 'Dataset'
			})
		});
		var responseJson = await response.json();
		
		if (responseJson.data.co2emis && responseJson.data.co2emis.length > 0)
		{
			co2Now = responseJson.data.co2emis.reverse()[0].CO2Emission;
		}
		responseJson.data.co2emis = responseJson.data.co2emis.filter(o => new Date(o.Minutes5UTC).getUTCMinutes() % 10 == 0);


		return responseJson.data.co2emis;
	});

	const co2emisprognosis = (async () => {
		const query = `
			query Dataset($startDate: timestamptz!) {
				co2emisprog(where:{Minutes5UTC: {_gte: $startDate}PriceArea: {_eq: \"DK2\"}}) {
					Minutes5UTC
					Minutes5DK
					PriceArea
					CO2Emission
				}
			}
		`;

		var startDate = new Date();
		const variables = { "startDate": startDate };
		const response = await fetch(apiUrl,
		{
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				query: query,
				variables: variables,
				operationName: 'Dataset'
			})
		});
		var responseJson = await response.json();
		responseJson.data.co2emisprog = responseJson.data.co2emisprog.filter(o => new Date(o.Minutes5UTC).getUTCMinutes() == 0);

	    return responseJson.data.co2emisprog;
	});

	const update = (async () => {
		const co2emisResult = await co2emis();
		const co2emisprognosisResult = await co2emisprognosis();
		const elspotpricesResult = await elspotprices();

		options.series = [
			{
				name: "Spot price",
				type: "area",
				data: elspotpricesResult.map(o => [new Date(o.HourUTC), Math.round((o.SpotPriceDKK / 1000 + Number.EPSILON) * 100) / 100])
			},
			{
				name: "Co2",
				type: 'line',
				data: co2emisResult.map(o => [new Date(o.Minutes5UTC), o.CO2Emission])
			},
			{
				name: "Co2 prognosis",
				type: 'line',
				data: co2emisprognosisResult.map(o => [new Date(o.Minutes5UTC), o.CO2Emission])
			}
		];
	});


	let options = {
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

	
	let ms = 10000;
	setInterval(update, ms);
 	update();
</script>
<main>
	<nav>
		<ul>
			<li><label for="taxes"><input type="checkbox" id="taxes"> elafgift</label></li>
			<li><label for="tarif"><input type="checkbox" id="tarif"> nettarif</label></li>
			<li><label for="priceAreaDK1"><input type="radio" id="priceAreaDK1" name="priceArea" value="DK1"> DK1</label> <label for="priceAreaDK2"><input type="radio" id="priceAreaDK2" name="priceArea" value="DK2"> DK2</label></li>
		</ul>
	</nav>
		<h1>Elspotpris</h1>
		<div class="flexgrid meters">
			<div class="col">
				<h2>{priceNow} <small>kr/kWh</small></h2>
				<p>Spotpris lige nu</p>
			</div>
			<div class="col">
				<h2>{co2Now} <small>g/kWh</small></h2>
				<p>Co2 lige nu</p>
			</div>
		</div>
	{#if options.series}
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
	main {
		text-align: center;
		padding: 1em;
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