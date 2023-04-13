import { writable } from 'svelte/store';
import { createWritableBoolFromUrl, createWritableStringFromUrl } from './urlStore.js';
import { consumptionTypes, products } from './prices.js';

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

export const calculatedProducts = writable();

export const prices = writable();
export const priceNow = writable(0);
export const spotNow = writable(0);
export const transport = writable();
export const transportNow = writable();
export const governmentTariffsNow = writable();
export const transmissionTariffsNow = writable();

export const co2EmissionNow = writable(0);
export const co2Emissions = writable();
export const co2EmissionsPrognosis = writable();

export const tax = createWritableBoolFromUrl('tax', true);
export const electricityTax = createWritableBoolFromUrl('electricityTax', true);
export const tariff = createWritableStringFromUrl('tariff', 'none');
export const productId = createWritableStringFromUrl('productId', products[0].id);
export const darkMode = createWritableBoolFromUrl('darkMode', false);
export const menuClosed = createWritableBoolFromUrl('menuClosed', false);
export const mainMenuClosed = createWritableBoolFromUrl('mainMenuClosed', false);
export const transmission = createWritableBoolFromUrl('transmission', true);
export const co2Enabled = createWritableBoolFromUrl('co2Enabled', false);
export const priceRegion = createWritableStringFromUrl('priceRegion');

const storedConsumptionId = browser ? localStorage.getItem('consumption') : null;
const storedConsumption = storedConsumptionId
	? consumptionTypes.find((t) => t.id == storedConsumptionId)
	: consumptionTypes[0];
export const consumption = writable(storedConsumption ? storedConsumption : consumptionTypes[0]);
consumption.subscribe((value) => {
	if (browser) localStorage.setItem('consumption', value.id);
});

const storedCustomConsumption = browser ? localStorage.getItem('customConsumption') : null;
export const customConsumption = writable(storedCustomConsumption);
customConsumption.subscribe((value) => {
	if (browser) localStorage.setItem('customConsumption', value);
});

let storedGraphId = browser ? localStorage.getItem('graph') : null;
if (storedGraphId === 'graph') {
	storedGraphId = 'bars';
}
const storedGraph = storedGraphId ? graphTypes.find((t) => t.id == storedGraphId) : graphTypes[0];
export const graph = writable(storedGraph ? storedGraph : graphTypes[0]);
graph.subscribe((value) => {
	if (browser) localStorage.setItem('graph', value.id);
});
