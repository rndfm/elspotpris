import { priceNow, prices, co2EmissionNow, co2Emissions, co2EmissionsPrognosis, priceRegion, electricityTax, tax, tariff } from "./stores.js";

let region = "DK2";
let selectedTariff;

let includeElectricityTax = false;
const electicityTaxAmount = .9;

let includeTax = false;
const taxRate = 1.25;

const apiUrl = 'https://data-api.energidataservice.dk/v1/graphql';

const calculateTariff = (datetime) => {
    let month = datetime.getMonth() + 1;
    let hour = datetime.getHours();
    // Peak load october to march between 17 to 20. 
    let peakLoad = (month >= 10 || month <= 3) && (hour >= 17 && hour < 20);

    return peakLoad ? selectedTariff.peak : selectedTariff.normal;
};

const calculatePrice = (electricityPrice, datetime) => 
{
    const pricePerKwh = (electricityPrice / 1000
        + (includeElectricityTax ? electicityTaxAmount : 0)
        + (selectedTariff ? calculateTariff(datetime) : 0))
        * (includeTax ? taxRate : 1);

    return Math.round((pricePerKwh + Number.EPSILON) * 100) / 100;
}


const elspotprices = (async () => {
    const query = `
        query Dataset($startDate: timestamptz!) {
            elspotprices(where:{HourUTC: {_gte: $startDate}PriceArea: {_eq: "${region}"}}) {
                HourUTC
                HourDK
                PriceArea
                SpotPriceDKK
            }
        }
    `;

    var startDate = new Date();
    startDate.setHours(startDate.getHours() - 24);

    const variables = { "startDate": startDate };
    const response = await fetch(apiUrl,
    {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: query,
            variables: variables,
            operationName: 'Dataset'
        })
    });
    const responseJson = await response.json();

    return responseJson.data.elspotprices;
});

const co2emis = (async () => {
    const query = `
        query Dataset($startDate: timestamptz!) {
            co2emis(where:{Minutes5UTC: {_gte: $startDate}PriceArea: {_eq: \"DK2\"}}) {
                Minutes5UTC
                Minutes5DK
                PriceArea
                CO2Emission
            }
        }
    `;

    var startDate = new Date();
    startDate.setHours(startDate.getHours() - 24);

    const variables = { "startDate": startDate };
    const response = await fetch(apiUrl,
    {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: query,
            variables: variables,
            operationName: 'Dataset'
        })
    });
    var responseJson = await response.json();
    
    if (responseJson.data.co2emis && responseJson.data.co2emis.length > 0)
    {
        co2EmissionNow.set(responseJson.data.co2emis.reverse()[0].CO2Emission);
    }
    responseJson.data.co2emis = responseJson.data.co2emis.filter(o => new Date(o.Minutes5UTC).getUTCMinutes() % 10 == 0);


    return responseJson.data.co2emis;
});

const co2emisprognosis = (async () => {
    const query = `
        query Dataset($startDate: timestamptz!) {
            co2emisprog(where:{Minutes5UTC: {_gte: $startDate}PriceArea: {_eq: \"DK2\"}}) {
                Minutes5UTC
                Minutes5DK
                PriceArea
                CO2Emission
            }
        }
    `;

    var startDate = new Date();
    startDate.setHours(startDate.getHours() - 1);
    const variables = { "startDate": startDate };
    const response = await fetch(apiUrl,
    {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: query,
            variables: variables,
            operationName: 'Dataset'
        })
    });
    var responseJson = await response.json();
    responseJson.data.co2emisprog = responseJson.data.co2emisprog.filter(o => new Date(o.Minutes5UTC).getUTCMinutes() == 0);

    return responseJson.data.co2emisprog;
});

let elspotpricesResult;
const updatePrices = (async () => {
    elspotpricesResult = await elspotprices();
    calculatePrices(elspotpricesResult);
});

const calculatePrices = (result) => {
    prices.set(
        result.map(o => 
        [
            new Date(o.HourUTC),
            calculatePrice(o.SpotPriceDKK, new Date(o.HourUTC))
        ])
    );

    // Extract current price.
    if (result && result.length > 0)
    {
        var now = new Date();
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);
        
        var priceEntry = result.filter(x => new Date(x.HourUTC) >= now)[0];
        priceNow.set(calculatePrice(priceEntry.SpotPriceDKK, new Date(priceEntry.HourUTC)))
    }
};

const update = (async () => {
    updatePrices();
    const co2emisResult = await co2emis();
    const co2emisprognosisResult = await co2emisprognosis();

    co2Emissions.set(co2emisResult.map(o => [new Date(o.Minutes5UTC), o.CO2Emission]));
    co2EmissionsPrognosis.set(co2emisprognosisResult.map(o => [new Date(o.Minutes5UTC), o.CO2Emission]));
});


let ms = 10000;
setInterval(updatePrices, ms);

priceRegion.subscribe(value => {
    region = value;
    updatePrices();
});

electricityTax.subscribe((value) => {
    includeElectricityTax = value;
    if (elspotpricesResult)
        calculatePrices(elspotpricesResult);
});

tax.subscribe((value) => {
    includeTax = value;
    if (elspotpricesResult)
        calculatePrices(elspotpricesResult);
});

tariff.subscribe((value) => {
    selectedTariff = value;
    if (elspotpricesResult)
        calculatePrices(elspotpricesResult);
});

update();