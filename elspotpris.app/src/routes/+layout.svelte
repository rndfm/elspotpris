<script>
	import "./global.scss";
	import {
		mainMenuClosed,
	} from "./stores.js";

</script>

<style lang="scss">
	nav#navigation {
		padding: 0 1em;

		position: absolute;
		height: 100%;
		z-index: 9999;

		max-width: 999px;
		transition: max-width 0.15s ease-out;
		transition: padding 0.15s ease-out;

		@media only screen and (min-width: 1200px) {
			position: relative;
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
			cursor: pointer;

			.chevron::before {
				border-style: solid;
				border-width: 0.25em 0.25em 0 0;
				content: '';
				display: inline-block;
				position: relative;
				top: 0.25em;
				transform: rotate(-135deg);
				vertical-align: top;
				width: 0.45em;
				height: 0.45em;
			}
		}

		&.closed {
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

	main {
		flex:1;
		overflow-y: auto;
		padding: 0 1em;
	}
</style>

<nav id="navigation" class:closed="{$mainMenuClosed}">
	<button on:click="{() => $mainMenuClosed = !$mainMenuClosed}" class="tab" aria-label="Åben og luk menu"><span class="chevron up"></span></button>
	<div>
		<span class="logo">elspotpris.dk</span>
		<ul>
			<li><a href="/">Live</a></li>
			<li><a href="/sammenlign">Sammenlign</a></li>
			<!-- <li><a href="/automatisering">Automatisering</a></li>
			<li><a href="/om-elspotpris">Om elspotpris.dk</a></li> -->
		</ul>
	</div>
</nav>
<main>
<slot />
</main>