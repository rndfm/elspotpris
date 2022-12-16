<script>
import { consumptionTypes } from "../prices.js";
import { product, consumption, customConsumption, calculatedProducts} from "../stores.js";
import {} from "../data.js";

let productCalculations;
calculatedProducts.subscribe((value) =>  {
    productCalculations = value;
});

function round(amount)
{
    return (Math.round((amount + Number.EPSILON) * 100) / 100).toFixed(2);
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

</script>

<svelte:head>
	<title>elspotpris.dk - Sammenlign priserne hos elselskaberne.</title>
	<meta name="description" content="Her kan du sammenligne de reelle udgifter hos elselskaberne. Her vises spotpristillæg, betalingsgebyrer mv.">
</svelte:head>

<style lang="scss">
    .table-scroll {
        overflow-x: auto;
    }

    table {
        td {
            img.warning
            {
                padding-left: .5em;
            }
        }
    }
</style>

    <h1>Sammenlign elprodukter med variabel pris</h1>
    <p><strong>Der sammenlignes på tillæg til spotprisen, abonnement og gebyrer. Altså den del, du betaler ekstra til et elselskab for at købe strømmen hos dem.</strong></p>
    <p>Priserne vises uden elspotpris, elafgift og transport da disse ikke påvirkes af dit valg af elselskab.</p>
    <span>Ved forbrug pr. år.:</span>
    <select bind:value={$consumption}>
        {#each consumptionTypes as item}
            <option value={item}>
                {item.name}
            </option>
        {/each}
    </select>
    {#if $consumption.amount === null}
    <p>
        <label for="customConsumption">Indtast årligt forbrug (kWh)</label>
        <input id="customConsumption" type="number" bind:value={$customConsumption}/>
    </p>
    
    {/if}
    {#if productCalculations}
    <div class="table-scroll">
        <table>
            <thead>
                <tr><td>Produkt</td><td>Afregning</td><td class="right">Spotpris tillæg</td><td class="right">Abonnement & gebyrer</td><td class="right">Årlige omkostninger (eksl. elspotpris)</td></tr>
            </thead>
            {#each productCalculations.sort((a,b) => a.calculatedPrices.total - b.calculatedPrices.total) as item}
                <tr>
                    <td><a href="/" on:click="{product.set(item)}">{item.name}{#if shouldWarn(item)}<img class="warning" src="/warning.svg" alt="Advarsel" title="Der er bemærkninger til prisen. Klik for mere info." width="16" height="16">{/if}</a></td>
                    <td>{item.payments}</td>
                    <td class="right">{round(item.calculatedPrices.surcharges)} kr</td>
                    <td class="right">{round(item.calculatedPrices.fees)} kr</td>
                    <td class="right"><strong>{round(item.calculatedPrices.total)} kr</strong></td>
                </tr>
            {/each}
        </table>
    </div>
    {/if}

    <p>Omkostningerne vises årligt for det valgte forbrug. Alle priser vises eksl. moms.</p>