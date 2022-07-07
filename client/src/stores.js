import { writable } from 'svelte/store';
import { tariffs, products } from "./prices.js";

export const userCount = writable(0);

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

const storedProductId = localStorage.getItem("product");
const storedProduct = storedProductId ? products.find(t => t.id == storedProductId) : products[0];
export const product = writable(storedProduct ? storedProduct : products[0]);
product.subscribe(value => {
    localStorage.setItem("product", value.id);
});

const storedDarkMode = localStorage.getItem("darkMode");
export const darkMode = writable(storedDarkMode == "true"); // Default to false when not stored.
darkMode.subscribe(value => {
    localStorage.setItem("darkMode", value);
});

const menuClosedStored = localStorage.getItem("menuClosed");
export const menuClosed = writable(menuClosedStored == "true"); // Default to false when not stored.
menuClosed.subscribe(value => {
    localStorage.setItem("menuClosed", value);
});