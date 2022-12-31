import { writable } from 'svelte/store';
import { products, consumptionTypes } from './prices.js';

import Table from './lib/Table.svelte';
import Bars from './lib/Bars.svelte';

import { browser } from '$app/environment';

export const graphTypes = [
	{
		id: 'bars',
		name: 'Søjler',
		component: Bars
	},
	{
		id: 'table',
		name: 'Tabel',
		component: Table
	}
];

let storedPriceRegion = browser ? localStorage.getItem('priceRegion') ?? null : null;
export const priceRegion = writable(storedPriceRegion);
priceRegion.subscribe((value) => {
	if (browser) localStorage.setItem('priceRegion', value);
});

export const calculatedProducts = writable();

export const prices = writable();
export const priceNow = writable(0);
export const transport = writable();
export const transportNow = writable();
export const governmentTariffsNow = writable();
export const transmissionTariffsNow = writable();

export const co2EmissionNow = writable(0);
export const co2Emissions = writable();
export const co2EmissionsPrognosis = writable();

function createWriteableBoolFromLocalStorage(key, defaultValue) {
	var value = defaultValue;
	const storedValue = browser ? localStorage.getItem(key) : null;
	if (storedValue !== null) value = storedValue === 'true';

	let writeableBool = writable(value);
	writeableBool.subscribe((value) => {
		if (browser) localStorage.setItem(key, value);
	});

	return writeableBool;
}

function createWriteableNumberFromLocalStorage(key, defaultValue) {
	var value = Number(defaultValue);
	const storedValue = browser ? localStorage.getItem(key) : null;
	if (storedValue !== null) value = Number(storedValue);

	let writeableNumber = writable(value);
	writeableNumber.subscribe((value) => {
		if (browser) localStorage.setItem(key, value);
	});

	return writeableNumber;
}

function createWriteableObjectFromLocalStorage(key, options) {
	const storedObjectId = browser ? localStorage.getItem(key) ?? null : null;
	const storedObject = storedObjectId
		? options.find((o) => o.id == storedObjectId) ?? options[0]
		: options[0];
	let writeableObject = writable(storedObject);
	writeableObject.subscribe((value) => {
		if (browser) localStorage.setItem(key, value.id);
	});

	return writeableObject;
}

function createWriteableStringFromLocalStorage(key, defaultValue) {
	const storedString = browser ? localStorage.getItem(key) ?? defaultValue : null;

	let writeableString = writable(storedString);
	writeableString.subscribe((value) => {
		if (browser) localStorage.setItem(key, value);
	});

	return writeableString;
}

export const tax = createWriteableBoolFromLocalStorage('tax', true);
export const electricityTax = createWriteableBoolFromLocalStorage('electricityTax', true);
export const tariff = createWriteableStringFromLocalStorage('tariff', 'none');
export const product = createWriteableObjectFromLocalStorage('product', products);
export const darkMode = createWriteableBoolFromLocalStorage('darkMode', false);
export const menuClosed = createWriteableBoolFromLocalStorage('menuClosed', false);
export const mainMenuClosed = createWriteableBoolFromLocalStorage('mainMenuClosed', false);
export const transmission = createWriteableBoolFromLocalStorage('transmission', true);

export const co2Enabled = createWriteableBoolFromLocalStorage('co2Enabled', false);

const storedConsumptionId = browser ? localStorage.getItem('consumption') : null;
const storedConsumption = storedConsumptionId
	? consumptionTypes.find((t) => t.id == storedConsumptionId)
	: consumptionTypes[0];
export const consumption = writable(storedConsumption ? storedConsumption : consumptionTypes[0]);
consumption.subscribe((value) => {
	if (browser) localStorage.setItem('consumption', value.id);
});

export const customConsumption = createWriteableNumberFromLocalStorage('customConsumption');

let storedGraphId = browser ? localStorage.getItem('graph') : null;
if (storedGraphId === 'graph') {
	storedGraphId = 'bars';
}
const storedGraph = storedGraphId ? graphTypes.find((t) => t.id == storedGraphId) : graphTypes[0];
export const graph = writable(storedGraph ? storedGraph : graphTypes[0]);
graph.subscribe((value) => {
	if (browser) localStorage.setItem('graph', value.id);
});
