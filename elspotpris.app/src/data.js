import {
	priceNow,
	prices,
	co2EmissionNow,
	co2Emissions,
	co2EmissionsPrognosis,
	priceRegion,
	tax,
	tariff,
	product,
	calculatedProducts,
	consumption,
	customConsumption,
	electricityTax,
	transmission,
	transport,
	transportNow,
	governmentTariffsNow,
	transmissionTariffsNow
} from './stores.js';
import { governmentTariffs, transmissionTariffs, products } from './prices';
import { io } from 'socket.io-client';
import { get } from 'svelte/store';

let region = 'DK2';
let selectedTariff;
let selectedTariffId;
let selectedProduct;
let selectedConsumption;
let selectedCustomConsumption;
let priceData, transportData, co2EmisData, co2EmisProgData;
let includeTax = false;
let includeElectricityTax = false;
let includeTransmission = false;
export const taxRate = 1.25;

const getActiveTariffs = (datetime) => {
	if (!selectedTariff) {
		return null;
	}

	const activeEntries = selectedTariff.entries.filter(
		(e) =>
			(e.validFrom === null || new Date(e.validFrom) <= datetime) &&
			(e.validTo === null || new Date(e.validTo) > datetime)
	);

	let hour = datetime.getHours();
	const activeTariffs = [];
	activeEntries.forEach((entry) => {
		entry.prices
			.filter((t) => t.start <= hour && t.end >= hour)
			.forEach((p) => {
				activeTariffs.push(p);
			});
	});

	return activeTariffs;
};

const getActiveGovernmentTariffs = (datetime) => {
	return governmentTariffs
		.filter(t => (t.validFrom === null || new Date(t.validFrom) <= datetime) && (t.validTo === null || new Date(t.validTo) > datetime))
};

const getActiveTransmissionTariffs = (datetime) => {
	return transmissionTariffs
		.filter(t => (t.validFrom === null || new Date(t.validFrom) <= datetime) && (t.validTo === null || new Date(t.validTo) > datetime))
};

const calculateTariffs = (datetime) => {
	if (datetime == null) {
		datetime = new Date();
	}

	let amount = 0;

	if (includeElectricityTax) {
		amount += getActiveGovernmentTariffs(datetime)
		.reduce((previous, current) => {
			return previous + current.amount;
		}, 0);
	}

	if (includeTransmission) {
		amount += getActiveTransmissionTariffs(datetime)
		.reduce((previous, current) => {
			return previous + current.amount;
		}, 0);
	}
	const activeTariffs = getActiveTariffs(datetime);
	if (activeTariffs) {
		amount += getActiveTariffs(datetime)
		.reduce((previous, current) => {
			return previous + current.price;
		}, 0);
	}
	return amount;
};

const calculateProductPrice = (product, spotPrice, region) => {
	return product.prices?.reduce((previous, current) => {
		if (current.region != null && current.region !== region) return previous;

		if (current.amount === null) return previous + spotPrice;

		if (current.amount === undefined) return previous;

		return previous + current.amount;
	}, 0);
};

const calculateTotalPrice = (product, spotPrice, datetime) => {
	const pricePerKwh =
		(calculateProductPrice(product, spotPrice, region) + calculateTariffs(datetime)) *
		(includeTax ? taxRate : 1);

	return Math.round((pricePerKwh + Number.EPSILON) * 100) / 100;
};

const calculatePrices = () => {
	if (priceData) {
		prices.set(
			priceData.map((o) => [
				new Date(o.hour),
				calculateTotalPrice(
					selectedProduct,
					o.prices.filter((p) => p.area == region)[0].price / 1000,
					new Date(o.hour)
				)
			])
		);

		calculatedProducts.set(
			products
				.filter((p) => !p.excludeInComparison)
				.map((p) => {
					p.calculatedPrices = {};

					const consumptionAmount = selectedConsumption.amount ?? selectedCustomConsumption;

					p.calculatedPrices.surcharges = (calculateProductPrice(p, 0, region) * consumptionAmount) * (includeTax ? taxRate : 1);

					p.calculatedPrices.total = p.calculatedPrices.surcharges;
					p.calculatedPrices.fees = p.fees?.reduce(
						(total, next) => total + (next.amount || 0) * (next.paymentsPerYear || 0),
						0
					);
					if (!isNaN(p.calculatedPrices.fees)) {
						p.calculatedPrices.fees = p.calculatedPrices.fees * (includeTax ? taxRate : 1);
						p.calculatedPrices.total += p.calculatedPrices.fees;
					}
					return p;
				})
		);

		// Extract current price.
		if (priceData && priceData.length > 0) {
			var now = getDateInTimezone('Europe/Copenhagen');
			now.setMinutes(0);
			now.setSeconds(0);
			now.setMilliseconds(0);

			const priceEntry = priceData.filter((x) => new Date(x.hour) >= now)[0];
			priceNow.set(
				calculateTotalPrice(
					selectedProduct,
					priceEntry.prices.filter((p) => p.area == region)[0].price / 1000,
					new Date(priceEntry.hour)
				)
			);

			const transportEntry = getActiveTariffs(now);
			transportNow.set(transportEntry);

			const activeGovernmentTariffs = getActiveGovernmentTariffs(now);
			governmentTariffsNow.set(activeGovernmentTariffs);

			const activeTransmissionTariffs = getActiveTransmissionTariffs(now);
			transmissionTariffsNow.set(activeTransmissionTariffs);
		}
	}
};

function getDateInTimezone(timezone) {
	let nz_date_string = new Date().toLocaleString('en-US', { timeZone: timezone });
	// Date object initialized from the above datetime string
	const date = new Date(nz_date_string);
	date.timeZone = timezone;
	return date;
}

const updateCo2Emis = () => {
	if (co2EmisData) {
		co2EmissionNow.set(co2EmisData.filter((e) => e.PriceArea == region)[0].CO2Emission);
		co2Emissions.set(
			co2EmisData
				.filter((e) => e.PriceArea == region)
				.map((o) => [new Date(o.Minutes5DK), o.CO2Emission])
		);
	}

	if (co2EmisProgData) {
		// Limit prog data to price data date range.
		const lastestPriceDate = new Date(
			Math.max.apply(
				null,
				get(prices).map((p) => p[0])
			)
		);
		co2EmissionsPrognosis.set(
			co2EmisProgData
				.filter((e) => e.PriceArea == region)
				.map((o) => [new Date(o.Minutes5DK), o.CO2Emission])
				.filter((o) => o[0] <= lastestPriceDate)
		);
	}
};

const environment = process.env.NODE_ENV;
if (environment == 'development') var socket = io(':3000');
else var socket = io();

socket.on('region', function (data) {
	priceRegion.set(data);
});

socket.on('prices', function (data) {
	priceData = data;
	calculatePrices();
});

socket.on('transport', function (data) {
	transportData = data;
	if (selectedTariffId) {
		selectedTariff = transportData.find((t) => t.id === selectedTariffId);
	}
	transport.set(transportData);
	calculatePrices();
});

socket.on('co2emis', function (data) {
	co2EmisData = data;
	updateCo2Emis();
});

socket.on('co2emisprog', function (data) {
	co2EmisProgData = data;
	updateCo2Emis();
});

priceRegion.subscribe((value) => {
	if (value == null || value == undefined || value == 'undefined' || value == 'null') {
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
	selectedTariffId = value;
	if (value && transportData) {
		selectedTariff = transportData.find((t) => t.id === value);
		calculatePrices();
	}
});

product.subscribe((value) => {
	selectedProduct = value;
	calculatePrices();
});

consumption.subscribe((value) => {
	selectedConsumption = value;
	calculatePrices();
});

customConsumption.subscribe((value) => {
	selectedCustomConsumption = value;
	calculatePrices();
});

electricityTax.subscribe((value) => {
	includeElectricityTax = value;
	calculatePrices();
});

transmission.subscribe((value) => {
	includeTransmission = value;
	calculatePrices();
});
