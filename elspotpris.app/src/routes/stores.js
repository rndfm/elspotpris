import { writable } from 'svelte/store';
import { tariffs, products, consumptionTypes } from "./prices.js";

export const userCount = writable(0);

let storedPriceRegion = localStorage.getItem("priceRegion");
export const priceRegion = writable(storedPriceRegion);
priceRegion.subscribe(value => {
    localStorage.setItem("priceRegion", value);
});

export const calculatedProducts = writable();

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

const storedElectricityTax = localStorage.getItem("electricityTax");
export const electricityTax = writable(!storedElectricityTax || storedElectricityTax == "true"); // Default to true when not stored.
electricityTax.subscribe(value => {
    localStorage.setItem("electricityTax", value);
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

const mainMenuClosedStored = localStorage.getItem("mainMenuClosed");
export const mainMenuClosed = writable(mainMenuClosedStored == "true"); // Default to false when not stored.
mainMenuClosed.subscribe(value => {
    localStorage.setItem("mainMenuClosed", value);
});

const storedConsumptionId = localStorage.getItem("consumption");
const storedConsumption = storedConsumptionId ? consumptionTypes.find(t => t.id == storedConsumptionId) : consumptionTypes[0];
export const consumption = writable(storedConsumption ? storedConsumption : consumptionTypes[0]);
consumption.subscribe(value => {
    localStorage.setItem("consumption", value.id);
});

const storedLegendsEnabled = localStorage.getItem("legendsEnabled");
export const legendsEnabled = writable(storedLegendsEnabled ? JSON.parse(storedLegendsEnabled) : {}); // Default no filter
legendsEnabled.subscribe(value => {
    localStorage.setItem("legendsEnabled", JSON.stringify(value));
});
