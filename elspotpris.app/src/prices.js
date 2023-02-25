export const governmentTariffs = [
	{
		id: 'elafgift2022',
		name: 'Elafgift 2022',
		amount: 0.723,
		validFrom: null,
		validTo: "2023-01-01T00:00:00",
	},
	{
		id: 'elafgift2023',
		name: 'Elafgift 2023',
		amount: 0.008,
		validFrom: "2023-01-01T00:00:00",
		validTo: "2023-06-01T00:00:00",
	}
];

export const transmissionTariffs = [
	{
		id: 'balance',
		name: 'Balancetarif for forbrug 2022',
		amount: 0.00229,
		validFrom: null,
		validTo: "2023-01-01T00:00:00"
	},
	{
		id: 'systemtarif',
		name: 'Systemtarif 2022',
		amount: 0.061,
		validFrom: null,
		validTo: "2023-01-01T00:00:00"
	},
	{
		id: 'transmissionsnettarif',
		name: 'Transmissions nettarif 2022',
		amount: 0.049,
		validFrom: null,
		validTo: "2023-01-01T00:00:00"
	},
	{
		id: 'systemtarif2023',
		name: 'Systemtarif 2023',
		amount: 0.054,
		validFrom: "2023-01-01T00:00:00",
		validTo: null
	},
	{
		id: 'transmissionsnettarif2023',
		name: 'Transmissions nettarif 2023',
		amount: 0.058,
		validFrom: "2023-01-01T00:00:00",
		validTo: null
	}
];

export const consumptionTypes = [
	{
		id: 'apartment_small',
		name: 'Lejlighed op til 80 kvm (ca 2000 kWh)',
		amount: 2000
	},
	{
		id: 'apartment_large',
		name: 'Lejlighed over 80 kvm (ca 3000 kWh)',
		amount: 3000
	},
	{
		id: 'house_small',
		name: 'Hus op til 130 kvm (ca 4000 kWh)',
		amount: 4000
	},
	{
		id: 'house_large',
		name: 'Hus over 130 kvm (ca 6000 kWh)',
		amount: 6000
	},
	{
		id: 'house_large_heatpump',
		name: 'Hus med varmepumpe (ca 10000 kWh)',
		amount: 10000
	},
	{
		id: 'house_large_electric_heat',
		name: 'Hus med elvarme (ca 18000 kWh)',
		amount: 18000
	},
	{
		id: 'cottage',
		name: 'Sommerhus (ca. 2000 kWh)',
		amount: 2000
	},
	{
		id: 'custom',
		name: 'Indtast selv forbrug',
		amount: null
	}
];

export const products = [
	{
		id: 'spotpris',
		name: 'Spotpris',
		prices: [
			{
				name: 'Spotpris',
				amount: null
			}
		],
		fees: [],
		excludeInComparison: true
	},
	{
		id: 'no-spotpris',
		name: 'Uden spotpris',
		prices: [
			{
				name: 'Uden spotpris',
				amount: 0
			}
		],
		fees: [],
		excludeInComparison: true
	},
	{
		id: 'nrgi_bevarmigel',
		name: 'NRGi - Bevar-Mig-El',
		link: 'https://nrgi.dk/privat/stroem/produkter/bestil-stroem/bevar-mig-el',
		payments: 'Forbrugsafregnet månedligt',
		paymentType: "consumption",
		bindingPeriod: "6 mdr. binding",
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.0384,
				calculated: true,
				conditions: null
			},
			{
				name: 'Grønt tiltag - plante træer',
				amount: 0.08,
				conditions: 'fast pris i aftalen'
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 13,
				paymentsPerYear: 12
			},
			{
				name: 'Indbetalingskort pr. regning',
				amount: 39.2
			},
			{
				name: 'Betalingsservice pr. regning',
				amount: 6.4,
				paymentsPerYear: 12
			}
		]
	},
	{
		id: 'nrgi_indkoebspris',
		name: 'NRGi - Indkøbspris',
		link: 'https://nrgi.dk/privat/stroem/produkter/bestil-stroem/indkoebspris-bestil/elpris/',
		payments: 'Forbrugsafregnet månedligt',
		paymentType: "consumption",
		bindingPeriod: "6 mdr. binding",
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.0384,
				calculated: true,
				conditions: null
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 31.2,
				paymentsPerYear: 12
			},
			{
				name: 'Indbetalingskort pr. regning',
				amount: 39.2
			},
			{
				name: 'Betalingsservice pr. regning',
				amount: 6.4,
				paymentsPerYear: 12
			}
		]
	},
	{
		id: 'nettopower',
		name: 'nettopower',
		link: 'https://www.nettopower.dk/',
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.1,
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 0
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 0,
				paymentsPerYear: 4
			}
		]
	},
	{
		id: 'velkommen',
		name: 'Velkommen',
		link: 'https://velkommen.dk/',
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: "6 mdr. binding",
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.15,
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 0
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 6.6,
				paymentsPerYear: 4
			}
		]
	},
	{
		id: 'vindstoed_danskvind',
		name: 'Vindstød DanskVind',
		link: 'https://www.vindstoed.dk/',
		logo: 'logo/vindstod.png',
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.005
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 0
			},
			{
				name: 'Omkostning/gebyr pr. regning. ved betaling via netbank.',
				amount: 0
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 8,
				paymentsPerYear: 4
			}
		]
	},
	{
		id: 'vindstoed_vestroem',
		name: 'Vindstød VEstrøm',
		link: 'https://www.vindstoed.dk/',
		logo: 'logo/vindstod.png',
		discountAgreement: true,
		payments: 'Forbrugsafregnet kvartalsvis',
		paymentType: "consumption",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.012
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 0
			},
			{
				name: 'Omkostning/gebyr pr. regning. ved betaling via netbank.',
				amount: 0
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 8,
				paymentsPerYear: 4
			}
		]
	},
	{
		id: 'vindstoed_lokalvind',
		name: 'Vindstød LokalVind',
		link: 'https://www.vindstoed.dk/',
		logo: 'logo/vindstod.png',
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.005
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 10,
				paymentsPerYear: 12
			},
			{
				name: 'Omkostning/gebyr pr. regning. ved betaling via netbank.',
				amount: 0
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 8,
				paymentsPerYear: 4
			}
		]
	},
	{
		id: 'vindstoed_spotvind',
		name: 'Vindstød SpotVind',
		link: 'https://www.vindstoed.dk/',
		logo: 'logo/vindstod.png',
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.152
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 23.2,
				paymentsPerYear: 12
			},
			{
				name: 'Omkostning/gebyr pr. regning. ved betaling via netbank.',
				amount: 0
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 8,
				paymentsPerYear: 4
			}
		]
	},
	{
		id: 'vindstoed_elforbundet',
		name: 'Elforbundet.dk 2022 – Vindstød',
		link: 'https://www.elforbundet.dk/',
		logo: 'logo/vindstod.png',
		discountAgreement: true,
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.0,
				conditions: 'Prisen udløber ved aftalens afslutning.'
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 0
			},
			{
				name: 'Omkostning/gebyr pr. regning. ved betaling via netbank.',
				amount: 0
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 8,
				paymentsPerYear: 4
			}
		]
	},
	{
		id: 'ewii_groen_indkoebspris',
		name: 'EWII Grøn Indkøbspris',
		link: 'https://www.ewii.dk/privat/el/groen-el/groen-indkoebspris/',
		logo: 'logo/ewii.png',
		payments: 'Forbrugsafregnet månedligt',
		paymentType: "consumption",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.03
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 23.2,
				paymentsPerYear: 12
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 4.6
			},
			{
				name: 'Betaling via mobilepay',
				amount: 0,
				paymentsPerYear: 12
			},
			{
				name: 'Betaling via girokort',
				amount: 39.2
			}
		]
	},
	{
		id: 'gasel',
		name: 'Gasel',
		link: 'https://www.gasel.dk/',
		logo: '/logo/gasel.png',
		payments: 'Forbrugsafregnet månedligt',
		paymentType: "consumption",
		bindingPeriod: "6 mdr. binding",
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.01
			}
		],
		fees: [
			{
				name: 'Abonnement pr. måned(gennemsnit)',
				amount: 24.3333,
				paymentsPerYear: 12
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 4.656
			}
		]
	},
	{
		id: 'aura_flexel',
		name: 'AURA FlexEl',
		link: 'https://www.aura.dk/',
		payments: 'Acontobetaling månedligt',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.05
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 16.664,
				paymentsPerYear: 12
			},
			{
				name: 'Omkostning/gebyr pr. regning.'
			}
		]
	},
	{
		id: 'ok_el_flex',
		name: 'OK El Flex',
		link: 'https://www.ok.dk/',
		payments: 'Acontobetaling månedligt',
		paymentType: "advance",
		bindingPeriod: "6 mdr. binding",
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.1057
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 0
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 0
			},
			{
				name: 'Indbetalingskort',
				amount: 0
			},
			{
				name: 'Rykkergebyr',
				amount: 100
			}
			
		]
	},
	{
		id: 'groen_ok_el_flex',
		name: 'Grøn OK El Flex',
		link: 'https://www.ok.dk/',
		payments: 'Acontobetaling månedligt',
		paymentType: "advance",
		bindingPeriod: "6 mdr. binding",
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.2057
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 0
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 0
			},
			{
				name: 'Indbetalingskort',
				amount: 0
			},
			{
				name: 'Rykkergebyr',
				amount: 100
			}
			
		]
	},
	{
		id: 'norlys_flexel',
		name: 'Norlys FlexEl',
		link: 'https://norlys.dk/',
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.035
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 69.6,
				paymentsPerYear: 4
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 0
			},
			{
				name: 'Betaling via indbetalingskort',
				amount: 39.2
			}
		]
	},
	{
		id: 'andel_energi_variabel_pris',
		name: 'andel energi - Variabel pris',
		link: 'https://andelenergi.dk/',
		payments: 'Acontobetaling månedligt',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.045,
				calculated: true
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 31.96,
				paymentsPerYear: 12
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 5
			},
			{
				name: 'Der er stoppet for salg af produktet hos Andel Energi'
			}
		]
	},
	{
		id: 'sef_energi_as_fleksvind',
		name: 'SEF Energi A/S - FleksVIND',
		link: 'https://www.sef.dk/privat/el/fleksvind/',
		payments: 'Acontobetaling månedligt',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.136
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 23.2,
				paymentsPerYear: 12
			},
			{
				name: 'Betaling - pr. udstedt faktura.',
				amount: 39.2
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 4.8,
				paymentsPerYear: 12
			}
		]
	},
	{
		id: 'clever',
		name: 'Clever Power',
		link: 'https://clever.dk/produkter/clever-power/',
		logo: '/logo/clever.png',
		payments: 'Forbrugsafregnet månedligt',
		paymentType: "consumption",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.008
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 39.2,
				paymentsPerYear: 12
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 0
			}
		]
	},
	{
		id: 'kernfull',
		name: 'Kärnfull',
		link: 'https://dk.karnfull.com/',
		payments: 'Forbrugsafregnet månedligt',
		paymentType: "consumption",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.05594
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 31.2,
				paymentsPerYear: 12
			},
			{
				name: 'Betaling via betalingskort',
				amount: 28
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 6.4,
				paymentsPerYear: 12
			},
			{
				name: 'Rykkergebyr',
				amount: 80
			}
		]
	},
	{
		id: 'modstroem_g',
		name: 'Modstrøm Grundprodukt',
		link: 'https://www.modstroem.dk/privat/bliv-kunde/',
		payments: 'Forbrugsafregnet månedligt',
		paymentType: "consumption",
		bindingPeriod: "6 mdr. binding",
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.15
			},
			{
				name: 'Tillæg til transport',
				amount: 0.11
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 39.2,
				paymentsPerYear: 12
			},
			{
				name: 'Betaling via betalingskort',
				amount: 32
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 7.96,
				paymentsPerYear: 12
			},
			{
				name: 'Betaling via Bankoverførsel',
				amount: 80
			},
			{
				name: 'Rykkergebyr',
				amount: 80
			}
		]
	},
	{
		id: 'verdo_variabel_timepris',
		name: 'Verdo Variabel Timepris',
		link: 'https://www.verdo.com/dk/elsalg-privat/',
		payments: 'Acontobetaling 2 måneder',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.06
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 20,
				paymentsPerYear: 12
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 7.2
			},
			{
				name: 'Betaling via MobilePay',
				amount: 0,
				paymentsPerYear: 12
			}
		]
	},
	{
		id: 'jysk_energi_fdm-stroem',
		name: 'Jysk Energi - FDM Strøm',
		link: 'https://fdm.dk/vi-tilbyder/groen-el-fdm-stroem',
		logo: '/logo/jysk-energi.png',
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: null,
		discountAgreement: true,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.0025
			},
			{
				name: 'Grønt tiltag',
				amount: 0.025
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 16,
				paymentsPerYear: 12
			},
			{
				name: 'Indbetalingskort pr. regning',
				amount: 39.2
			},
			{
				name: 'Betalingsservice pr. regning',
				paymentsPerYear: 4,
				amount: 6
			}
		]
	},
	{
		id: 'oe_stroem',
		name: 'Ø-Strøm - SpotEL',
		link: 'https://www.xn---strm-uuae.dk/elprodukter-fra-oe/stroem/spotel/',
		payments: 'Forbrugsafregnet månedligt',
		paymentType: "consumption",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.08,
				calculated: true
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 10,
				paymentsPerYear: 12
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 5,
				paymentsPerYear: 12
			}
		]
	},
	{
		id: 'energi_fyn_spotel',
		name: 'Energi Fyn - SpotEl',
		link: 'https://www.energifyn.dk/privat/el/spotel/',
		payments: 'Forbrugsafregnet månedligt',
		paymentType: "consumption",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.04
			},
			{
				name: 'Abonnement pr. kWh',
				amount: 0.036
			}
		],
		fees: [
			{
				name: 'Betaling via betalingsservice',
				amount: 4.984,
				paymentsPerYear: 12
			},
			{
				name: 'MobilePay pr. regning',
				amount: 2.6
			},
			{
				name: 'Abonnement',
				amount: 12,
				paymentsPerYear: 12
			}
		]
	},
	{
		id: 'jysk_energi_min-stroem',
		name: 'Jysk Energi - Min Strøm',
		link: 'https://jyskenergi.dk/el/privat/min-stroem/',
		logo: '/logo/jysk-energi.png',
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.04
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 12,
				paymentsPerYear: 12
			},
			{
				name: 'Betalingsservice pr. regning',
				paymentsPerYear: 4,
				amount: 6
			}
		]
	},
	{
		id: 'andel_energi_timeenergi',
		name: 'andel energi - TimeEnergi',
		link: 'https://andelenergi.dk/',
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.16
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 12.8,
				paymentsPerYear: 12
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 5
			},
			{
				name: 'Betaling via MobilePay',
				amount: 0
			}
		]
	},
	{
		id: 'forsyning_helsingoer_kronborg_el',
		name: 'Forsyning Helsingør - Kronborg El',
		link: 'https://www.fh.dk/el/kronborg-el',
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris - Vest (variabel)*',
				amount: 0.01319,
				conditions: "Tillæg ændre sig måned for måned og kendes først 3 måneder efter forbrug.",
				region: 'DK1'
			},
			{
				name: 'Tillæg til spotpris - Øst (variabel)*',
				amount: 0.1056,
				conditions: "Tillæg ændre sig måned for måned og kendes først 3 måneder efter forbrug.",
				region: 'DK2'
			},
			{
				name: 'Handelstillæg',
				amount: 0.04
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 9.6,
				paymentsPerYear: 12
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 0,
				conditions: 'Ikke bekræftet'
			}
		]
	},
	{
		id: 'forsyning_helsingoer_kronborg_el_plus',
		name: 'Forsyning Helsingør - Kronborg El+',
		link: 'https://www.fh.dk/el/kronborg-el',
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris - Vest (variabel)*',
				amount: 0.01319,
				conditions: "Tillæg ændre sig måned for måned og kendes først 3 måneder efter forbrug.",
				region: 'DK1'
			},
			{
				name: 'Tillæg til spotpris - Øst (variabel)*',
				amount: 0.1056,
				conditions: "Tillæg ændre sig måned for måned og kendes først 3 måneder efter forbrug.",
				region: 'DK2'
			},
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 24,
				paymentsPerYear: 12
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 0,
				conditions: 'Ikke bekræftet'
			}
		]
	},
	{
		id: 'bornholms_energi_og_forsyning',
		name: 'Bornholms Energi & Forsyning',
		link: 'https://www.beof.dk/privat',
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.08
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 30,
				paymentsPerYear: 4
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 0
			}
		]
	},
	{
		id: 'go-energi_go_spot_energi',
		name: 'go\'energi go\'spot energi',
		link: 'https://go-energi.dk/elprodukter/til-private',
		logo: '/logo/go-energi.png',
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.04
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 36,
				paymentsPerYear: 4
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 0
			}
		]
	},
	{
		id: 'go-energi_go_spot_maaned',
		name: 'go\'energi go\'spot måned',
		link: 'https://go-energi.dk/elprodukter/til-private',
		logo: '/logo/go-energi.png',
		payments: 'Acontobetaling månedsvis',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.04
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 72,
				paymentsPerYear: 4
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 0
			}
		]
	},
	{
		id: 'go-energi_go_vind_energi',
		name: 'go\'energi go\'vind energi',
		link: 'https://go-energi.dk/elprodukter/til-private',
		logo: '/logo/go-energi.png',
		payments: 'Acontobetaling kvartalsvis',
		paymentType: "advance",
		bindingPeriod: null,
		prices: [
			{
				name: 'Spotpris',
				amount: null
			},
			{
				name: 'Tillæg til spotpris',
				amount: 0.064
			}
		],
		fees: [
			{
				name: 'Abonnement',
				amount: 36,
				paymentsPerYear: 4
			},
			{
				name: 'Betaling via betalingsservice',
				amount: 0
			}
		]
	},
	{
		id: 'nordisk_energy',
		name: 'Nordisk Energy',
		link: 'https://nordiskenergy.dk/',
		payments: 'Forbrugsafregnet månedsvis',
		paymentType: "consumption",
		prices: null,
		fees: null,
		bindingPeriod: "6 mdr. binding",
		disabled: true
	},
	{
		id: 'nef',
		name: 'nef',
		link: 'https://nef.dk/elprodukter/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'gronelforsyning',
		name: 'Grøn El-Forsyning',
		link: 'https://gronelforsyning.dk/el/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'stromlinet',
		name: 'Strømlinet',
		link: 'https://stromlinet.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'energi_viborg',
		name: 'Energi Viborg',
		link: 'https://www.energiviborg.dk/stroem/bestil-stroem',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'looad',
		name: 'LOOAD',
		link: 'https://looad.dk/el-til-hjemmet/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'forsyningen',
		name: 'Forsyningen',
		link: 'https://www.forsyningen.dk/Privat/El',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'lokal_energi',
		name: 'Lokal-Energi',
		link: 'https://www.lokal-energi.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'forskel',
		name: 'forskel',
		link: 'https://forskel.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'natur-energi',
		name: 'natur-energi',
		link: 'https://www.natur-energi.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'sk-energi',
		name: 'sk energi',
		link: 'https://skenergi.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'gostrom',
		name: 'GoStrøm',
		link: 'http://www.gostrom.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'elektron',
		name: 'elektron',
		link: 'https://elektron.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'b_energy',
		name: 'b energy',
		link: 'https://b.energy/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'energiselskabet_elg',
		name: 'Energiselskabet ELG',
		link: 'https://elgpower.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'samstrom',
		name: 'Samstrøm',
		link: 'https://samstrom.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'den_glade_eltavle',
		name: 'Den Glade Eltavle',
		link: 'https://dengladeeltavle.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'energidrift',
		name: 'Energidrift',
		link: 'https://energidrift.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'gnp_energy',
		name: 'GNP Energy',
		link: 'https://dk.gnp.energy/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'preasy',
		name: 'PREASY',
		link: 'https://preasy.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'stromtid',
		name: 'strømtid',
		link: 'https://stromtid.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'grow_energy',
		name: 'Grow Energy',
		link: 'https://growenergy.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	},
	{
		id: 'samstrom',
		name: 'samstrøm',
		link: 'https://samstrom.dk/',
		payments: 'Ikke oplyst',
		prices: null,
		fees: null,
		disabled: true
	}
];
