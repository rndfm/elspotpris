<script>
	import { prices } from '../stores.js';
	import {} from '../data.js';

	let thePrices;
	let avarageRunPrice = 1337;

	prices.subscribe((value) => {
		if (!value) return;

		thePrices = value.map((v) => {
			return { time: v[0], price: v[1], run: false, taken: false, description: '' };
		});

		calculateBestRunTimes();
	});

	function calculateBestRunTimes() {
		const runTime = 2;
		const minimumRunCount = 1;
		const maximumRunCount = 4;
		const runInterval = 1;
		const invert = true;
		const maxInterval = 5; // Virker ikke helt endnu

		let fullPlan = false;

		for (let run = 0; (run < minimumRunCount || !fullPlan) && run < maximumRunCount; run++) {
			let bestRunPrice = null;
			let bestRunStartPosition = null;
			let hoursSinceRun = 0;
			for (let i = 0; i < thePrices.length; i++) {
				if (i == thePrices.length - 1) fullPlan = true;

				if (i + runTime > thePrices.length) {
					thePrices[i].description = 'out';
					continue;
				}

				// is this position taken?
				let positionTaken = false;
				for (let ii = i; ii < i + runTime + runInterval && ii < thePrices.length; ii++) {
					if (thePrices[ii].taken) positionTaken = true;
				}

				hoursSinceRun++;

				if (thePrices[i].run) {
					hoursSinceRun = 0;
				}

				if (positionTaken) {
					continue;
				}

				let priceForThisPosition = 0;
				for (let ii = i; ii < i + runTime; ii++) {
					priceForThisPosition += thePrices[ii].price;
				}
				priceForThisPosition = priceForThisPosition / runTime;
				if (invert) priceForThisPosition = 0 - priceForThisPosition;

				thePrices[i].description = priceForThisPosition;
				if (bestRunPrice == null || bestRunPrice > priceForThisPosition) {
					bestRunPrice = priceForThisPosition;
					bestRunStartPosition = i;
				}

				if (hoursSinceRun > maxInterval) {
					break;
				}
			}

			// Mark taken
			if (bestRunStartPosition != null) {
				for (let i = bestRunStartPosition; i < bestRunStartPosition + runTime; i++) {
					thePrices[i].run = true;
					thePrices[i].taken = true;
				}

				for (
					let i = bestRunStartPosition + runTime;
					i < bestRunStartPosition + runTime + runInterval && i < thePrices.length;
					i++
				) {
					thePrices[i].taken = true;
				}
			}
		}

		calculateAvarageRunPrice();
	}

	function calculateAvarageRunPrice() {
		if (!thePrices) return;

		const runTimes = thePrices.filter((p) => p.run);
		avarageRunPrice = runTimes.reduce((p, c) => p + c.price, 0) / runTimes.length;
	}

	var dateStringOptions = { weekday: 'long', hour: '2-digit' };
</script>

<table>
	{#if thePrices}
		{#each thePrices as price}
			<tr
				><td>{price.time.toLocaleDateString('da-DK', dateStringOptions)}</td><td>{price.price}</td
				><td>{price.description}</td><td class:run={price.run} :class="">{price.run}</td><td
					class:taken={price.taken}
					:class="">{price.taken}</td
				></tr
			>
		{/each}
	{/if}
</table>
<p>Average run price: {avarageRunPrice}</p>

<style>
	.run {
		background-color: green;
	}

	.taken {
		background-color: yellow;
	}
</style>
