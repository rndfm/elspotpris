<script>
import { consumptionTypes } from "../prices.js";
import { product, consumption, calculatedProducts} from "../stores.js";
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
    <p><strong>Priserne herunder vises uden spotpris, elafgift, transport m.v. og er kun selve tillæg til spotprisen, abonnement m.v. Altså den del, du betaler ekstra til et elselskab for at købe strømmen hos dem.</strong></p>
    <p>Bemærk at flere selskaber har aconto/forudbetaling. Klik på produktet for at se mere information.</p>
    <span>Ved forbrug pr. år.:</span>
    <select bind:value={$consumption}>
        {#each consumptionTypes as item}
            <option value={item}>
                {item.name}
            </option>
        {/each}
    </select>

    {#if productCalculations}
    <div class="table-scroll">
        <table>
            <thead>
                <tr><td>Produkt</td><td>Afregning</td><td>Betaling</td><td class="right">Spotpris tillæg</td><td class="right">Abonnement mv.</td><td class="right">Total (ekskl. spotpris)</td></tr>
            </thead>
            {#each productCalculations.sort((a,b) => a.calculatedPrices.total - b.calculatedPrices.total) as item}
                <tr>
                    <td><a href="/" on:click="{product.set(item)}">{item.name}{#if shouldWarn(item)}<img class="warning" src="/warning.svg" alt="Advarsel" title="Der er bemærkninger til prisen. Klik for mere info." width="16" height="16">{/if}</a></td>
                    <td>{item.payments}</td>
                    <td></td>
                    <td class="right">{round(item.calculatedPrices.surcharges)} kr</td>
                    <td class="right">{round(item.calculatedPrices.fees)} kr</td>
                    <td class="right"><strong>{round(item.calculatedPrices.total)} kr</strong></td>
                </tr>
            {/each}
        </table>
    </div>
    {/if}