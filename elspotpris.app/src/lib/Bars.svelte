<script>
    import { prices, co2Emissions, co2EmissionsPrognosis, co2Enabled } from "../routes/stores.js";
	import { onMount, onDestroy } from 'svelte'

    export let height = 500;
    let container;
    let priceData;
    let co2EmissionsData;
    let co2EmissionsPrognosisData;
    let nowPosition;
    let autoScroll = true;
    let autoScrollDisabledTimer;
    let scrollLeft = 0;
    let labels;
    let co2Max = 200;
    let co2Labels;
    let co2EnabledData;
    let viewPortWidth;

    co2Enabled.subscribe(value => {
        co2EnabledData = value;
    });

    function calculateCo2Labels()
    {
        co2Labels = [];
        labels.forEach(priceLabel => {
            var value = priceLabel.position * co2Max;
            value = Math.round(value / 25) * 25;

            co2Labels.push({
                text: value + " g",
                position: priceLabel.position
            });
        });


        console.log(co2Labels);
    }

    const hourDateStringOptions = { hour: "2-digit" };
    let timer;

    let priceFormatter = new Intl.NumberFormat('da-DK', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 5
	}).format;

    onMount(async () => {
        prices.subscribe((value) => {
            if (value)
            {
                const maxPrice = Math.max(...value.map(p => p[1]));
                const minPrice = Math.min(...value.map(p => p[1]));

                labels = [];
                for (let i = 1; i < maxPrice; i++)
                {
                    labels.push({
                        text: i + " kr",
                        position: i / maxPrice
                    });
                }

                calculateCo2Labels();

                priceData = [];
                value.forEach(p => {
                    const price = p[1];
                    const severity = (price - minPrice) / (maxPrice - minPrice);
                    const red = ((severity * 235) | 0).toString(16).padStart(2,'0');
                    const green = (((1 - severity) * 130) + 45 | 0).toString(16).padStart(2,'0');
                    const blue = (((1 - Math.abs(severity - 0.5)) * 70) | 0).toString(16).padStart(2,'0');
                    
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

        co2Emissions.subscribe(value => {
            if (value)
            {
                co2EmissionsData = value.map(v => { return { position: positionFromDate(v[0]), emission: v[1]}});
                const max = Math.max(co2EmissionsData.map(e => e.emission));
                if (max > co2Max)
                {
                    co2Max = max;
                    calculateCo2Labels();
                }
            }
        });

        co2EmissionsPrognosis.subscribe(value => {
            if (value)
            {
                co2EmissionsPrognosisData = value.map(v => { return { position: positionFromDate(v[0]), emission: v[1]}});
                const max = Math.max(co2EmissionsPrognosisData.map(e => e.emission));
                if (max > co2Max)
                {
                    co2Max = max;
                    calculateCo2Labels();
                }
            }
        });

		timer = setInterval(() => {
            setActive();
        }, 10000);
	});

    onDestroy( () => {
		if (timer)
            clearInterval(timer);
    })

    const isActive = (date, dateNow) => {
        return date.getHours() == dateNow.getHours() && date.getDay() == dateNow.getDay();
    }

    function getDateInTimezone(timezone)
	{
		let nz_date_string = new Date().toLocaleString("en-US", { timeZone: timezone });
		// Date object initialized from the above datetime string
		const date = new Date(nz_date_string);
		date.timeZone = timezone;
		return date;
	}

    function positionFromDate(date)
    {
        const dates = priceData.map(d => d.time);
        const minDate = Math.min(...dates);
        let maxDate = new Date(Math.max(...dates));
        maxDate.setHours(maxDate.getHours() + 1);

        return (date - minDate) / (maxDate - minDate) * 100;
    }

    function toggleCo2()
    {
        co2Enabled.set(!co2EnabledData);
    }

    function setActive()
    {
        if (!priceData)
            return;

        const dateNow = getDateInTimezone("Europe/Copenhagen");

        // find the current price and set it as active.
        priceData.forEach(d => {
            d.active = isActive(d.time, dateNow);
        });

        // set position of "right now" indicator line.
        nowPosition = positionFromDate(dateNow);

        // scroll now indicator into view. (Use setTimeout to allow UI to render before scrolling)
        if (autoScroll)
        {
            setTimeout(() => {
                const totalWidth = container.scrollWidth;
                const viewPortWidth = container.clientWidth;

                container.scroll({
                    left: totalWidth * (nowPosition / 100) - (viewPortWidth / 3), // Show indicator one third into view.
                    top: 0,
                    behavior: 'smooth'
                })
            }, 1000);
        }
    }

    function disableAutoScroll()
    {
        if (autoScrollDisabledTimer)
            clearInterval(autoScrollDisabledTimer);

        autoScroll = false;

        autoScrollDisabledTimer = setTimeout(() => {
            autoScroll = true;  
        }, 30000);
    }
</script>

<style lang="scss">
.bars
{
    min-width: 1200px;

    .price {
        fill-opacity: 0;
        writing-mode: tb;
        transform: translate(12px, 10px);
    }

    .bar {
        &.active, &:hover {
            stroke-width: 1;
            stroke: rgb(0, 150, 250);
        }

        &.active + .price, &:hover + .price{
            fill-opacity: 1;
        }

    }
    
    .now {
        stroke: #333;
        stroke-opacity: .2;
    }

    .text {
        fill: #333;
    }

    .label {
        stroke: #333;
        stroke-opacity: .2;
    }
}

.dark {
    .bars
    {
        .now {
            stroke: #bbb;
            stroke-opacity: .2;
        }

        .text {
            fill: #bbb;
        }

        .label {
            stroke: #bbb;
            stroke-opacity: .2;
        }
    }
}


ul.legend {
    list-style: none;
    display: flex;
    width: 100%;
    padding: 0;
    margin: 0;
    justify-content: center;

    li {
        padding: 0.5em;

        &.clickable {
            cursor: pointer;
        }

        &.disabled {
            opacity: 0.5;
        }

        .dot {
            height: 12px;
            width: 12px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
            vertical-align: baseline;
            margin: 0 0.25em;
            &.price {
                background: rgb(79,196,60);
                background: linear-gradient(90deg, rgba(79,196,60,1) 0%, rgba(212,84,38,1) 100%);
            }

            &.co2 {
                background-color: aqua;
            }
        }
    }
}
</style>

<div bind:this={container} on:touchstart={disableAutoScroll} on:scroll={()=>scrollLeft=container.scrollLeft} on:scroll={disableAutoScroll} class="scrollable" bind:clientWidth={viewPortWidth} style="height:{height+20}px">
    {#if priceData}
        <svg width="100%" height="{height}" class="bars">
            {#if nowPosition}
                <line x1="{nowPosition}%" y1="0" x2="{nowPosition}%" y2="{height}" class="now" />
                <text x="{nowPosition}%" y="12" transform="translate(5,0)" class="text">lige nu</text>
            {/if}

            {#each priceData as price, i}
                <rect y="{(height - 20) - price.height * (height - 40)}" x="{i * 2.083333333333333}%" height="{price.height * (height - 40)}" width="2%" class="bar" class:active="{price.active}" fill="{price.color}"></rect>    
                <text y="{(height - 20) - price.height * (height - 40)}" x="{i * 2.083333333333333}%" class="text price">{priceFormatter(price.price)}</text>
                <text y="{height}" x="{i * 2.083333333333333}%" class="text">{price.time.toLocaleTimeString("da-DK", hourDateStringOptions)}</text>
            {/each}

            {#each labels as label}
                <line x1="0" y1="{(height - 20) - label.position * (height - 40)}" x2="100%" y2="{(height - 20) - label.position * (height - 40)}" class="label" />
                <text x="{scrollLeft}" y="{(height - 20) - label.position * (height - 40) - 5}" fill="white" transform="translate(5,0)" class="text">{label.text}</text>
            {/each}

            {#if co2EnabledData}
                {#each co2EmissionsData as emission}
                    <rect y="{(height - 20) - (emission.emission/co2Max) * (height - 40)}" x="{emission.position}%" height="2px" width="1%" fill="aqua" opacity="0.8"></rect>    
                {/each}

                {#each co2EmissionsPrognosisData as emission}
                    <rect y="{(height - 20) - (emission.emission/co2Max) * (height - 40)}" x="{emission.position}%" height="2px" width="2%" fill="aqua" opacity="0.5"></rect>    
                {/each}

                {#if co2Labels}
                    {#each co2Labels as label}
                        <text x="{scrollLeft + viewPortWidth - 50}" y="{(height - 20) - label.position * (height - 40) - 5}" fill="white" transform="translate(5,0)" class="text">{label.text}</text>
                    {/each}
                {/if}
            {/if}
        </svg>
    {/if}
</div>
<ul class="legend">
    <li><span class="dot price"></span>Pris</li>
    <li behavior="button" on:click={toggleCo2} on:keypress={toggleCo2} class="clickable" class:disabled={!co2EnabledData}><span class="dot co2"></span>CO2 udledning</li>
</ul>
