<script>
    export let product;

    let pricePricisionFormatter = new Intl.NumberFormat('da-DK', {
		minimumFractionDigits: 5,
		maximumFractionDigits: 5
	}).format;

</script>

<table class="scrollable">
    <tr>
        <th colspan="2">
            {#if product.link}<a href={product.link} target="_blank" rel="noreferrer"
                    >{product.link}</a
                >{/if}
        </th>
    </tr>
    {#each product.prices.filter(p => p.amount !== null) as item}
        <tr>
            <td
                >{item.name}{#if item.region != undefined}&nbsp;{item.region}{/if}
                {#if item.calculated}<img
                        class="item-warning"
                        src="/warning.svg"
                        alt="Advarsel"
                        title="Prisen er regnet baglæns og er ikke bekræftet af elselskabet."
                        width="16"
                        height="16"
                    />{/if}
                {#if item.conditions === null}<img
                        class="item-warning"
                        src="/warning.svg"
                        alt="Advarsel"
                        title="Denne pris er uden betingelser fra elselskabet. Elselskabet kan ændre prisen uden varsel"
                        width="16"
                        height="16"
                    />{/if}
                {#if item.conditions}<img
                        class="item-warning"
                        src="/warning.svg"
                        alt="Advarsel"
                        title={item.conditions}
                        width="16"
                        height="16"
                    />{/if}
                {#if item.amount === undefined}<img
                        class="item-warning"
                        src="/warning.svg"
                        alt="Advarsel"
                        title="Denne pris er ukendt"
                        width="16"
                        height="16"
                    />{/if}
            </td>
            <td class="amount"
                >{#if item.amount != undefined}{pricePricisionFormatter(item.amount)} kr{/if}</td
            >
        </tr>
    {/each}
    {#if product.fees && product.fees.length > 0}
        {#each product.fees as item}
            <tr>
                <td
                    >{item.name}
                    {#if item.conditions === null}<img
                            class="item-warning"
                            src="/warning.svg"
                            alt="Advarsel"
                            title="Denne pris er uden betingelser fra elselskabet. Elselskabet kan ændre prisen uden varsel"
                            width="16"
                            height="16"
                        />{/if}
                    {#if item.conditions}<img
                        class="item-warning"
                        src="/warning.svg"
                        alt="Advarsel"
                        title={item.conditions}
                        width="16"
                        height="16"
                    />{/if}
                    {#if item.amount === undefined}<img
                            class="item-warning"
                            src="/warning.svg"
                            alt="Advarsel"
                            title="Denne pris er ukendt"
                            width="16"
                            height="16"
                        />{/if}
                    {#if item.paymentsPerYear}<div><small>({item.paymentsPerYear} betalinger om året)</small
                        ></div>{/if}</td
                >
                <td class="amount"
                    >{#if item.amount != undefined}{pricePricisionFormatter(item.amount)} kr{/if}</td
                >
            </tr>
        {/each}
    {/if}
    <tr>
        <td>Afregning</td>
        <td>{product.payments}</td>
    </tr>
</table>

<style lang="scss">
    table {
        border: 1px #333 solid;
		td.amount {
			text-align: right;
			white-space: nowrap;
		}
		th {
			padding: 1em 1em 1em 1em;
			text-align: left;
		}
	}
</style>