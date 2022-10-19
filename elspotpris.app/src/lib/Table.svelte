<script>
    import { prices	} from "../routes/stores.js";

    let priceData;

    const dayDateStringOptions = { weekday: 'long', day: "numeric" };
    const hourDateStringOptions = { hour: "2-digit" };

    function removeTime(date) {
        return new Date(date.toDateString());
    }

    const isActive = (date) => {
        return date.getHours() == new Date().getHours() && date.getDay() == new Date().getDay();
    }

    prices.subscribe((value) => {
        if (value)
        {
            const maxPrice = Math.max(...value.map(p => p[1]));
            const minPrice = Math.min(...value.map(p => p[1]));

            priceData = [];
            let day = null;
            value.forEach(p => {
                const severity = (p[1] - minPrice) / (maxPrice - minPrice);
                const red = ((severity * 200) | 0).toString(16).padStart(2,'0');
                const green = (((1 - severity) * 150) + 50 | 0).toString(16).padStart(2,'0');
                const blue = (((1 - Math.abs(severity - 0.5)) * 50) + 50 | 0).toString(16).padStart(2,'0');

                if (day == null || day.date.getTime() != removeTime(p[0]).getTime())
                {
                    day = { date: removeTime(p[0]), data: [] }
                    priceData.push(day);
                }

                day.data.push({
                    time: p[0], 
                    price: p[1],
                    color: `#${red}${green}${blue}`
                });
            });

            setActive();
        }
	});

    function setActive()
    {
        if (priceData)
        {
            priceData.forEach(d => {
                d.data.forEach(p => {
                    p.active = isActive(p.time);
                })
            });
        }
    }

    setInterval(() => {
        setActive();
	}, 10000);
</script>

<style lang="scss">
.price-table {
    display: flex;
    .day {
        padding: 0.5em;
        .hour {
            color: black;
            padding: 0.5em;
            font-size: 1.2em;
            &.active 
            {
                border: 0.15em dashed blue;
                padding: 0.35em 0.5em;
                font-weight: bold;
            }
        }
    }
}
</style>

{#if priceData}
<div class="price-table">
    {#each priceData as day}
    <div class="day">
        {day.date.toLocaleDateString("da-DK", dayDateStringOptions)}
        {#each day.data as price}
            <div class="hour" class:active="{price.active}" style="background-color: {price.color}">{price.time.toLocaleTimeString("da-DK", hourDateStringOptions)} - {price.price} kr</div>
        {/each}
    </div>
    {/each}
</div>
{/if}