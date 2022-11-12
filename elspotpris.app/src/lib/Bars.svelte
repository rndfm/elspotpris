<script>
	import { prices } from '../routes/stores.js';
	import { onMount, onDestroy } from 'svelte';

	export let height = 500;
	let container;
	let priceData;
	let nowPosition;
	let autoScroll = true;
	let autoScrollDisabledTimer;
	let labels;

	const dayDateStringOptions = { weekday: 'long', day: 'numeric' };
	const hourDateStringOptions = { hour: '2-digit' };
	let timer;

	onMount(async () => {
		prices.subscribe((value) => {
			if (value) {
				const maxPrice = Math.max(...value.map((p) => p[1]));
				const minPrice = Math.min(...value.map((p) => p[1]));

				labels = [];
				for (let i = 1; i < maxPrice; i++) {
					labels.push({
						text: i + ' kr',
						position: i / maxPrice
					});
				}

				priceData = [];
				value.forEach((p) => {
					const price = p[1];
					const severity = (price - minPrice) / (maxPrice - minPrice);
					const red = ((severity * 225) | 0).toString(16).padStart(2, '0');
					const green = (((1 - severity) * 120 + 80) | 0).toString(16).padStart(2, '0');
					const blue = (((1 - Math.abs(severity - 0.5)) * 50) | 0).toString(16).padStart(2, '0');

					priceData.push({
						time: p[0],
						price,
						color: `#${red}${green}${blue}`,
						height: price / maxPrice
					});
				});

				setActive();
			}
		});

		timer = setInterval(() => {
			setActive();
		}, 10000);
	});

	onDestroy(() => {
		if (timer) clearInterval(timer);
	});

	const isActive = (date) => {
		return date.getHours() == new Date().getHours() && date.getDay() == new Date().getDay();
	};

	function getDateInTimezone(timezone) {
		let nz_date_string = new Date().toLocaleString('en-US', { timeZone: timezone });
		// Date object initialized from the above datetime string
		const date = new Date(nz_date_string);
		date.timeZone = timezone;
		return date;
	}

	function setActive() {
		// find the current price and set it as active.
		if (priceData) {
			priceData.forEach((d) => {
				d.active = isActive(d.time);
			});
		}

		// set position of "right now" indicator line.
		const dateNow = getDateInTimezone('Europe/Copenhagen');
		const dates = priceData.map((d) => d.time);
		const minDate = Math.min(...dates);
		let maxDate = new Date(Math.max(...dates));
		maxDate.setHours(maxDate.getHours() + 1);

		nowPosition = ((dateNow - minDate) / (maxDate - minDate)) * 100;

		// scroll now indicator into view. (Use setTimeout to allow UI to render before scrolling)
		if (autoScroll) {
			setTimeout(() => {
				const totalWidth = container.scrollWidth;
				const viewPortWidth = container.clientWidth;

				container.scroll({
					left: totalWidth * (nowPosition / 100) - viewPortWidth / 3, // Show indicator one third into view.
					top: 0,
					behavior: 'smooth'
				});
			}, 2000);
		}
	}

	function disableAutoScroll() {
		if (autoScrollDisabledTimer) clearInterval(autoScrollDisabledTimer);

		autoScroll = false;

		autoScrollDisabledTimer = setTimeout(() => {
			autoScroll = true;
		}, 30000);
	}
</script>

<div bind:this={container} on:touchstart={disableAutoScroll} class="scrollable">
	{#if priceData}
		<svg width="100%" {height} class="bars">
			{#each priceData as price, i}
				<rect
					y={height - 20 - price.height * (height - 40)}
					x="{i * 2.083333333333333}%"
					height={price.height * (height - 40)}
					width="2%"
					class="bar"
					class:active={price.active}
					fill={price.color}
				/>
				<text
					y={height - 20 - price.height * (height - 40)}
					x="{i * 2.083333333333333}%"
					class="text price">{price.price}</text
				>
				<text y={height} x="{i * 2.083333333333333}%" class="text"
					>{price.time.toLocaleTimeString('da-DK', hourDateStringOptions)}</text
				>
			{/each}

			{#each labels as label}
				<line
					x1="0"
					y1={height - 20 - label.position * (height - 40)}
					x2="100%"
					y2={height - 20 - label.position * (height - 40)}
					class="label"
				/>
				<text
					x="0"
					y={height - 20 - label.position * (height - 40) - 5}
					fill="white"
					transform="translate(5,0)"
					class="text">{label.text}</text
				>
			{/each}

			{#if nowPosition}
				<line x1="{nowPosition}%" y1="0" x2="{nowPosition}%" y2={height} class="now" />
				<text x="{nowPosition}%" y="12" transform="translate(5,0)" class="text">lige nu</text>
			{/if}
		</svg>
	{/if}
</div>

<style lang="scss">
	.bars {
		min-width: 1200px;

		.price {
			fill-opacity: 0;
			writing-mode: tb;
			transform: translate(12px, 10px);
		}

		.bar {
			&.active,
			&:hover {
				stroke-width: 1;
				stroke: rgb(0, 150, 250);
			}

			&.active + .price,
			&:hover + .price {
				fill-opacity: 1;
			}
		}

		.now {
			stroke: #333;
		}

		.text {
			fill: #333;
		}

		.label {
			stroke: #333;
			stroke-opacity: 0.2;
		}
	}

	.dark {
		.bars {
			.now {
				stroke: #bbb;
			}

			.text {
				fill: #bbb;
			}

			.label {
				stroke: #bbb;
				stroke-opacity: 0.2;
			}
		}
	}
</style>
