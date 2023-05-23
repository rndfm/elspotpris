<script>
    import {
		darkMode
	} from '../stores.js';

    const donateLink =
		'https://products.mobilepay.dk/box/pay-in?id=2263bc16-d568-485c-98bd-b43768a5aa1a&phone=1996KN';
</script>

<div class="github">
    <p>
        {#if $darkMode}
            <img src="/github-dark.png" alt="github" width="32" height="32" />
        {:else}
            <img src="/github.png" alt="github" width="32" height="32" />
        {/if}
        Hjælp med at forbedre elspotpris.dk 
        <a href="https://github.com/rndfm/elspotpris" target="_blank" rel="noreferrer">https://github.com/rndfm/elspotpris</a>
    </p>
    <p>
        Denne side og beregningerne vedligeholdes af frivillige.<br />
        <strong>Siden er ikke sponsoreret.</strong>
    </p>
    <p>
        elspotpris.dk bliver udviklet og vedligeholdes i min fritid. Hvis siden er brugbar for dig,
        så overvej at støtte driften og den videre udvikling.<br />
        -
        <a href="https://www.linkedin.com/in/christian-reinholdt-76712b45/"
            target="_blank"
            rel="noreferrer">Christian Reinholdt</a>
    </p>
    <a href={donateLink} target="_blank" rel="noreferrer">
        <img
            src="/donate/donate-mobilepay.png"
            style="max-width: 100%; height: auto; width: auto;"
            alt="Støt elspotpris.dk med mobilepay"
            width="500"
            height="120"/>
    </a>
</div>

<style lang="scss">
    .github {
        padding: 3em 0;

        img {
            vertical-align: middle;
            padding-right: 10px;
        }
    }
</style>