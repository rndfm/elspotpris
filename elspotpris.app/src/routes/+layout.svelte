<script>
	import "./global.scss";
	import {
		mainMenuClosed,
		darkMode
	} from "./stores.js";

	let menuActive = false;

	darkMode.subscribe((value) => {
		if (value)
		{
			document.body.classList.add('dark')
		}
		else
		{
			document.body.classList.remove('dark')
		}
	});
</script>

<style lang="scss">
	nav#navigation {
		position: absolute;
		height: 100%;
		z-index: 9999;
		right:0;

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
				margin: 0 .25em 0.25em 0;
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
				padding: 0 .5em;

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
		left:0;
		width:100%;
		height:100%;
		background-color: rgba(0,0,0,.4);
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
		flex:1;
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

<nav id="navigation" class:closed="{$mainMenuClosed}" class:active="{menuActive}">
	<button on:click="{() => $mainMenuClosed = !$mainMenuClosed}" class="tab" aria-label="Åben og luk menu"><span class="chevron up"></span></button>
	<div>
		<span class="logo">elspotpris.dk</span>
		<ul>
			<li><a href="/" on:click="{() => menuActive = false}">Live</a></li>
			<li><a href="/sammenlign" on:click="{() => menuActive = false}">Sammenlign</a></li>
			<!-- <li><a href="/automatisering">Automatisering</a></li>
			<li><a href="/om-elspotpris">Om elspotpris.dk</a></li> -->
		</ul>
	</div>
</nav>
<div id="menu-backdrop" class:active="{menuActive}" on:click="{() => menuActive = false}"></div>
<div id="menu-container">
	<img src="/menu-icon.svg" height="25px" alt="menu" id="menu-toggle" on:click="{() => menuActive = true}" />
</div>	
<main>
	<slot />
	<div class="github">
		<p>
			{#if $darkMode}<img src="/github-dark.png" alt="github" width="32" height="32" />{:else}<img src="/github.png" alt="github" width="32" height="32"/>{/if}Hjælp med at forbedre denne side.
			<a href="https://github.com/rndfm/elspotpris" target="_blank">https://github.com/rndfm/elspotpris</a>
		</p>
		<p>
			Denne side og beregningerne vedligeholdes af frivillige individer. Siden er ikke sponsoreret.
		</p>
	</div>
</main>