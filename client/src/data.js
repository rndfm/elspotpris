import { userCount, priceNow, prices, co2EmissionNow, co2Emissions, co2EmissionsPrognosis, priceRegion, tax, tariff, product } from "./stores.js";
import { governmentTariffs } from './prices';
import { io } from "socket.io-client";

let region = "DK2";
let selectedTariff;
let selectedProduct;
let priceData, co2EmisData, co2EmisProgData;

let includeTax = false;
const taxRate = 1.25;

export const calculateTariff = (datetime) => {
    if (datetime == null)
        datetime = new Date();

    let amount = governmentTariffs.reduce((previous, current) => {
        return previous + current.amount;
    }, 0);

    let month = datetime.getMonth() + 1;
    let hour = datetime.getHours();
    // Peak load october to march between 17 to 20. 
    let peakLoad = (month >= 10 || month <= 3) && (hour >= 17 && hour < 20);

    return amount + (peakLoad ? selectedTariff.peak : selectedTariff.normal);
};

const calculateProductPrice = (spotPrice) =>
{
    return selectedProduct.prices.reduce((previous, current) => {
        if (current.region != null && current.region !== region)
             return previous;
        
        if (current.amount === null)
            return previous + spotPrice;

        if (current.amount === undefined)
            return previous;
            
        return previous + current.amount;
    }, 0);
};

const calculateTotalPrice = (spotPrice, datetime) => 
{
    const pricePerKwh = (calculateProductPrice(spotPrice, region)
        + (selectedTariff ? calculateTariff(datetime) : 0))
        * (includeTax ? taxRate : 1);

    return Math.round((pricePerKwh + Number.EPSILON) * 100) / 100;
};

const calculatePrices = () => {
    if (priceData)
    {
        prices.set(
            priceData.map(o => 
            [
                new Date(o.hour),
                calculateTotalPrice(o.prices.filter(p => p.area == region)[0].price / 1000, new Date(o.hour))
            ])
        );

        // Extract current price.
        if (priceData && priceData.length > 0)
        {
            var now = new Date();
            now.setMinutes(0);
            now.setSeconds(0);
            now.setMilliseconds(0);
            
            var priceEntry = priceData.filter(x => new Date(x.hour) >= now)[0];
            priceNow.set(calculateTotalPrice(priceEntry.prices.filter(p => p.area == region)[0].price / 1000, new Date(priceEntry.hour)))
        }
    }
};

const updateCo2Emis = () => 
{
    if (co2EmisData)
    {
        co2EmissionNow.set(co2EmisData.filter(e => e.PriceArea == region).reverse()[0].CO2Emission);
        co2Emissions.set(co2EmisData.filter(e => e.PriceArea == region).map(o => [new Date(o.Minutes5UTC), o.CO2Emission]));
    }

    if (co2EmisProgData)
        co2EmissionsPrognosis.set(co2EmisProgData.filter(e => e.PriceArea == region).map(o => [new Date(o.Minutes5UTC), o.CO2Emission]));
};

var socket = io();

socket.on('users', function(data) {
    userCount.set(data);
});

socket.on('prices', function(data) {
    priceData = data;
    calculatePrices();
});

socket.on('co2emis', function(data) {
    co2EmisData = data;
    updateCo2Emis();
});

socket.on('co2emisprog', function(data) {
    co2EmisProgData = data;
    updateCo2Emis();
});

priceRegion.subscribe(value => {
    region = value;
    calculatePrices();
    updateCo2Emis();
});

tax.subscribe((value) => {
    includeTax = value;
    calculatePrices();
});

tariff.subscribe((value) => {
    selectedTariff = value;
    calculatePrices();
});

product.subscribe((value) => {
    selectedProduct = value;
    calculatePrices();
});