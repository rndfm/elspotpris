import { userCount, priceNow, prices, co2EmissionNow, co2Emissions, co2EmissionsPrognosis, priceRegion, tax, tariff, product, calculatedProducts, consumption, electricityTax } from "./stores.js";
import { governmentTariffs, products } from './prices';
import { io } from "socket.io-client";

let region = "DK2";
let selectedTariff;
let selectedProduct;
let selectedConsumption;
let priceData, co2EmisData, co2EmisProgData;
let includeTax = false;
let includeElectricityTax = false;
const taxRate = 1.25;

export const calculateTariff = (datetime) => {
    if (datetime == null)
        datetime = new Date();
    let amount = 0;
    
    if (includeElectricityTax)
    {
        amount = governmentTariffs.reduce((previous, current) => {
            return previous + current.amount;
        }, 0);
    }

    let month = datetime.getMonth() + 1;
    let hour = datetime.getHours();
    // Peak load october to march between 17 to 20. 
    let peakLoad = (month >= 10 || month <= 3) && (hour >= 17 && hour < 20);

    return amount + (peakLoad ? selectedTariff.peak : selectedTariff.normal);
};

const calculateProductPrice = (product, spotPrice, region) =>
{
    return product.prices.reduce((previous, current) => {
        if (current.region != null && current.region !== region)
             return previous;
        
        if (current.amount === null)
            return previous + spotPrice;

        if (current.amount === undefined)
            return previous;
            
        return previous + current.amount;
    }, 0);
};

const calculateTotalPrice = (product, spotPrice, datetime) => 
{
    const pricePerKwh = (calculateProductPrice(product, spotPrice, region)
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
                calculateTotalPrice(selectedProduct, o.prices.filter(p => p.area == region)[0].price / 1000, new Date(o.hour))
            ])
        );

        calculatedProducts.set(
            products.filter(p => !p.excludeInComparison).map(p => {

                p.calculatedPrices = {
                    prices: priceData.map(o => 
                        [
                            new Date(o.hour),
                            calculateTotalPrice(p, o.prices.filter(p => p.area == region)[0].price / 1000, new Date(o.hour))
                        ])
                }
                p.calculatedPrices.average = p.calculatedPrices.prices.reduce((total, next) => total + next[1], 0) / p.calculatedPrices.prices.length;
                p.calculatedPrices.usage = (p.calculatedPrices.average * selectedConsumption.amount)
                p.calculatedPrices.surcharges = calculateProductPrice(p, 0, region) * selectedConsumption.amount;

                p.calculatedPrices.total = p.calculatedPrices.surcharges;
                p.calculatedPrices.fees = p.fees.reduce((total, next) => total + ((next.amount || 0) * (next.paymentsPerYear || 0)), 0);
                if (!isNaN(p.calculatedPrices.fees))
                {
                    p.calculatedPrices.total+= p.calculatedPrices.fees;
                }
                return p;
            })
        );

        // Extract current price.
        if (priceData && priceData.length > 0)
        {
            var now = getDateInTimezone("Europe/Copenhagen");
            now.setMinutes(0);
            now.setSeconds(0);
            now.setMilliseconds(0);
            
            var priceEntry = priceData.filter(x => new Date(x.hour) >= now)[0];
            priceNow.set(calculateTotalPrice(selectedProduct, priceEntry.prices.filter(p => p.area == region)[0].price / 1000, new Date(priceEntry.hour)))
        }
    }
};

function getDateInTimezone(timezone)
	{
		let nz_date_string = new Date().toLocaleString("en-US", { timeZone: timezone });
		// Date object initialized from the above datetime string
		const date = new Date(nz_date_string);
		date.timeZone = timezone;
		return date;
	}

const updateCo2Emis = () => 
{
    if (co2EmisData)
    {
        co2EmissionNow.set(co2EmisData.filter(e => e.PriceArea == region)[0].CO2Emission);
        co2Emissions.set(co2EmisData.filter(e => e.PriceArea == region).map(o => [new Date(o.Minutes5DK), o.CO2Emission]));
    }

    if (co2EmisProgData)
        co2EmissionsPrognosis.set(co2EmisProgData.filter(e => e.PriceArea == region).map(o => [new Date(o.Minutes5DK), o.CO2Emission]));
};

var socket = io(':3000');

socket.on('users', function(data) {
    userCount.set(data);
});

socket.on('region', function(data) {
    priceRegion.set(data);
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
    if (typeof value !== 'undefined' && !value) {
        socket.emit('region');
    } else {
        region = value;
        calculatePrices();
        updateCo2Emis();
    }
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

consumption.subscribe((value) => {
    selectedConsumption = value;
    calculatePrices();
});

electricityTax.subscribe((value) => {
    includeElectricityTax = value;
    calculatePrices();
});