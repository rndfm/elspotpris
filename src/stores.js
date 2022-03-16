import { writable } from 'svelte/store';
import { tariffs } from "./prices.js";

let storedPriceRegion = localStorage.getItem("priceRegion");
if (!storedPriceRegion)
{
    storedPriceRegion = "DK2";
}
export const priceRegion = writable(storedPriceRegion);
priceRegion.subscribe(value => {
    localStorage.setItem("priceRegion", value);
});

export const priceNow = writable(0);
export const prices = writable();

export const co2EmissionNow = writable(0);
export const co2Emissions = writable();
export const co2EmissionsPrognosis = writable();


const storedElectricityTax = localStorage.getItem("electricityTax");
export const electricityTax = writable(!storedElectricityTax || storedElectricityTax == "true"); // Default to true when not stored.
electricityTax.subscribe(value => {
    localStorage.setItem("electricityTax", value);
});

const storedTax = localStorage.getItem("tax");
export const tax = writable(!storedTax || storedTax == "true"); // Default to true when not stored.
tax.subscribe(value => {
    localStorage.setItem("tax", value);
});

const storedTariffId = localStorage.getItem("tariff");
const storedTariff = storedTariffId ? tariffs.find(t => t.id == storedTariffId) : tariffs[0];
export const tariff = writable(storedTariff ? storedTariff : tariffs[0]);
tariff.subscribe(value => {
    localStorage.setItem("tariff", value.id);
});


const storedTheme = localStorage.getItem("theme");
export const theme = writable(storedTheme);
theme.subscribe(value => {
    localStorage.setItem("theme", value === 'dark' ? 'dark' : 'light');
});