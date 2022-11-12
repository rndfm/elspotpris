import { writable } from 'svelte/store';
import { tariffs, products, consumptionTypes } from "./prices.js";

import Graph from "../lib/Graph.svelte";
import Table from "../lib/Table.svelte";
import Bars from "../lib/Bars.svelte";

import { browser } from '$app/environment';

export const graphTypes = [
    {
        id: "graph",
        name: "Graf",
        component: Graph
    },
    {
        id: "table",
        name: "Tabel",
        component: Table
    },
    {
        id: "bars",
        name: "Bars",
        component: Bars
    }
]

export const userCount = writable(0);

let storedPriceRegion = browser ? localStorage.getItem("priceRegion") ?? null : null;
export const priceRegion = writable(storedPriceRegion);
priceRegion.subscribe(value => {
    if (browser)
        localStorage.setItem("priceRegion", value);
});

export const calculatedProducts = writable();

export const priceNow = writable(0);
export const prices = writable();

export const co2EmissionNow = writable(0);
export const co2Emissions = writable();
export const co2EmissionsPrognosis = writable();

function createWriteableBoolFromLocalStorage(key, defaultValue)
{
    var value = defaultValue;
    const storedValue = browser ? localStorage.getItem(key) : null;
    if (storedValue !== null)
        value = storedValue === "true";

    let writeableBool = writable(value);
    writeableBool.subscribe(value => {
        if (browser)
            localStorage.setItem(key, value);
    });

    return writeableBool;
}

function createWriteableObjectFromLocalStorage(key, options)
{
    const storedObjectId = browser ? localStorage.getItem(key) ?? null: null;
    const storedObject = storedObjectId ? options.find(o => o.id == storedObjectId) ?? options[0] : options[0];
    let writeableObject = writable(storedObject);
    writeableObject.subscribe(value => {
        if (browser)
            localStorage.setItem(key, value.id);
    });

    return writeableObject;
}

export const tax = createWriteableBoolFromLocalStorage("tax", true);
export const electricityTax = createWriteableBoolFromLocalStorage("electricityTax", true);
export const tariff = createWriteableObjectFromLocalStorage("tariff", tariffs);
export const product = createWriteableObjectFromLocalStorage("product", products);
export const darkMode = createWriteableBoolFromLocalStorage("darkMode", false);
export const menuClosed = createWriteableBoolFromLocalStorage("menuClosed", false);
export const mainMenuClosed = createWriteableBoolFromLocalStorage("mainMenuClosed", false);

const storedConsumptionId = browser ? localStorage.getItem("consumption") : null;
const storedConsumption = storedConsumptionId ? consumptionTypes.find(t => t.id == storedConsumptionId) : consumptionTypes[0];
export const consumption = writable(storedConsumption ? storedConsumption : consumptionTypes[0]);
consumption.subscribe(value => {
    if (browser)
        localStorage.setItem("consumption", value.id);
});

const storedGraphId = browser ? localStorage.getItem("graph") : null;
const storedGraph = storedGraphId ? graphTypes.find(t => t.id == storedGraphId) : graphTypes[0];
export const graph = writable(storedGraph ? storedGraph : graphTypes[0]);
graph.subscribe(value => {
    if (browser)
        localStorage.setItem("graph", value.id);
});

const storedLegendsEnabled = browser ? localStorage.getItem("legendsEnabled") : null;
export const legendsEnabled = writable(storedLegendsEnabled ? JSON.parse(storedLegendsEnabled) : {}); // Default no filter
legendsEnabled.subscribe(value => {
    if (browser)
        localStorage.setItem("legendsEnabled", JSON.stringify(value));
});
