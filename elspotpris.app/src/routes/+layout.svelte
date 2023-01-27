<script>
	import './global.scss';
	import { mainMenuClosed, darkMode } from '../stores.js';
	import { browser } from '$app/environment';

	let menuActive = false;

	darkMode.subscribe((value) => {
		if (browser) {
			if (value) {
				document.body.classList.add('dark');
			} else {
				document.body.classList.remove('dark');
			}
		}
	});

	if (browser) {
		setInterval(() => {
			gtag('event', 'keepalive');
		}, 240000);
	}

	const donateLink =
		'https://products.mobilepay.dk/box/pay-in?id=2263bc16-d568-485c-98bd-b43768a5aa1a&phone=1996KN';
</script>

<nav id="navigation" class:closed={$mainMenuClosed} class:active={menuActive}>
	<button
		on:click={() => ($mainMenuClosed = !$mainMenuClosed)}
		class="tab"
		aria-label="Åben og luk menu"><span class="chevron" /></button
	>
	<div>
		<span class="logo">elspotpris.dk</span>
		<ul>
			<li><a href="/" on:click={() => (menuActive = false)}>Forside</a></li>
			<li><a href="/live" on:click={() => (menuActive = false)}>Live</a></li>
			<li><a href="/nyheder" on:click={() => (menuActive = false)}>Nyheder</a></li>
			<!-- <li><a href="/guide" on:click={() => (menuActive = false)}>Guide</a></li> -->
			<!-- <li><a href="/automatisering">Automatisering</a></li>
			<li><a href="/om-elspotpris">Om elspotpris.dk</a></li> -->
		</ul>
	</div>
</nav>
<div id="menu-backdrop" class:active={menuActive} on:click={() => (menuActive = false)} />
<div id="menu-container">
	<img
		src="/menu-icon.svg"
		height="25px"
		alt="menu"
		id="menu-toggle"
		on:click={() => (menuActive = true)}
	/>
</div>
<main>
	<slot />
	
	<div class="github">
		<p>
			{#if $darkMode}<img src="/github-dark.png" alt="github" width="32" height="32" />{:else}<img
					src="/github.png"
					alt="github"
					width="32"
					height="32"
				/>{/if}Hjælp med at forbedre elspotpris.dk
			<a href="https://github.com/rndfm/elspotpris" target="_blank" rel="noreferrer"
				>https://github.com/rndfm/elspotpris</a
			>
		</p>
		<p>
			Denne side og beregningerne vedligeholdes af frivillige individer. Siden er ikke sponsoreret.
		</p>
		<p>
			elspotpris.dk bliver udviklet og driftet i min fritid. Hvis elspotpris.dk er brugbar for dig,
			så overvej at støtte driften og den videre udvikling.<br />
			-
			<a
				href="https://www.linkedin.com/in/christian-reinholdt-76712b45/"
				target="_blank"
				rel="noreferrer">Christian Reinholdt</a
			>
		</p>
		<a href={donateLink} target="_blank" rel="noreferrer"
			><img
				src="/donate/donate-mobilepay.png"
				style="max-width: 100%; height: auto; width: auto;"
				alt="Støt elspotpris.dk med mobilepay"
				width="510"
				height="120"
			/></a
		>
	</div>
</main>

<style lang="scss">
	nav#navigation {
		position: absolute;
		height: 100%;
		z-index: 9999;
		right: 0;

		max-width: 0;
		transition: max-width 0.15s ease-out;
		transition: padding 0.15s ease-out;

		@media only screen and (min-width: 1200px) {
			position: relative;
			padding: 0 1em;
			max-width: 300px;
		}

		> div {
			overflow: hidden;

			> span.logo {
				color: #ff3e00;
				font-size: 2em;
				font-weight: 100;
				margin: 0 0.25em 0.25em 0;
				padding: 0;
				display: block;
			}

			> ul {
				list-style: none;
				padding: 0;
				margin: 0;

				> li {
					margin-bottom: 0.1em;

					a {
						display: block;
						padding: 1em;
					}
				}
			}
		}

		.tab {
			cursor: pointer;
			margin: 0;
			display: none;

			@media only screen and (min-width: 1200px) {
				display: block;
				position: absolute;
				top: 1px;
				right: -12px;
				border: none;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 33%;
				border-top-left-radius: 0;
				border-top-right-radius: 33%;
				width: 30px;
				height: 50px;
			}

			.chevron::before {
				border-style: solid;
				border-width: 0.25em 0.25em 0 0;
				content: '';
				display: inline-block;
				position: relative;
				top: 0.25em;
				vertical-align: top;
				width: 0.45em;
				height: 0.45em;
				transform: rotate(-135deg);
			}
		}

		&.active {
			max-width: 300px;
			padding: 0 1em;
		}

		&.closed {
			@media only screen and (min-width: 1200px) {
				max-width: 0px;
				padding: 0 0.5em;

				.tab {
					right: -12px;
					.chevron:before {
						left: -0.25em;
						top: 0.25em;
						transform: rotate(45deg);
					}
				}
			}
		}
	}

	#menu-container {
		position: relative;
		height: 0;

		#menu-toggle {
			position: absolute;
			top: 1.5em;
			right: 1.5em;
			cursor: pointer;

			@media only screen and (min-width: 1200px) {
				display: none;
			}
		}
	}

	#menu-backdrop {
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 999;
		&.active {
			display: block;
		}

		@media only screen and (min-width: 1200px) {
			&.active {
				display: none;
			}
		}
	}

	main {
		flex: 1;
		overflow-y: auto;
		padding: 0 1em;

		.github {
			padding: 5em 1em;

			img {
				vertical-align: middle;
				padding-right: 10px;
			}
		}
	}
</style>
