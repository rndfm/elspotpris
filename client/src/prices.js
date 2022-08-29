export const tariffs = [
    {
        id: "none",
        name: "Uden netselskab",
        normal: 0,
        peak: 0
    },
    {
        id: "radius_c",
        name: "Radius C",
        normal: .3003,
        peak: .7651
    },
    {
        id: "rah_c",
        name: "RAH C",
        normal: .1592,
        peak: .4595
    },
    {
        id: "konstant_c",
        name: "Konstant C",
        normal: .1432,
        peak: .3983
    },
    {
        id: "cerius_c",
        name: "Cerius C",
        normal: .3028,
        peak: .7885
    },
    {
        id: "n1_c",
        name: "N1 C",
        normal: .2951,
        peak: .7791
    },    
    {
        id: "n1_evonet_c",
        name: "N1 (tidl. Evonet) C",
        normal: .2114,
        peak: .6933
    },
    {
        id: "dinel_c",
        name: "Dinel C",
        normal: .1112,
        peak: .3462
    },
    {
        id: "trefor_el-net_oest_c",
        name: "Trefor El-Net Øst C",
        normal: .4131,
        peak: 1.1598
    },
    {
        id: "elektrus_c",
        name: "Elektrus C",
        normal: .2858,
        peak: .6461
    }
]

export const governmentTariffs = [
    {
        id: "elafgift",
        name: "Elafgift",
        amount: .763,
    },
    {
        id: "balance",
        name: "Balancetarif for forbrug",
        amount: .00229,
    },
    {
        id: "systemtarif",
        name: "Systemtarif",
        amount: .061,
    },
    {
        id: "transmissionsnettarif",
        name: "Transmissions nettarif",
        amount: .049,
    },
]

export const consumptionTypes = [
    {
        id: "apartment_small",
        name: "Lejlighed op til 80 kvm (ca 2000kWh)",
        amount: 2000
    },
    {
        id: "apartment_large",
        name: "Lejlighed over 80 kvm (ca 3000kWh)",
        amount: 3000
    },
    {
        id: "house_small",
        name: "Hus op til 130 kvm (ca 4000kWh)",
        amount: 4000
    },
    {
        id: "house_large",
        name: "Hus over 130 kvm (ca 6000kWh)",
        amount: 6000
    },
    {
        id: "house_large_electric_heat",
        name: "Hus med elvarme (ca 18000Wh)",
        amount: 18000
    },
    {
        id: "cottage",
        name: "Sommerhus (ca. 2000kWh)",
        amount: 2000
    }
]

export const products = [
    {
        id: "spotpris",
        name: "ren spotpris",
        prices: [
            {
                name: "Spotpris",
                amount: null
            }
        ],
        fees: [],
        excludeInComparison: true
    },
    {
        id: "nrgi_bevarmigel",
        name: "NRGi - Bevar-Mig-El",
        link: "https://nrgi.dk/privat/stroem/produkter/bestil-stroem/bevar-mig-el",
        prices: [
            {
                name: "Spotpris",
                amount: null,
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .037,
                calculated: true,
                conditions: null
            },
            {
                name: "Grønt tiltag - plante træer",
                amount: .08,
                conditions: "fast pris i aftalen"
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 16.25,
                paymentsPerYear: 12
            },
            {
                name: "Indbetalingskort pr. regning",
                amount: 49
            },
            {
                name: "Betalingsservice pr. regning",
                amount: 8,
                paymentsPerYear: 12
            },
            {
                name: "Gebyr ved kundens skift af leverandør i bindingsperiode",
                amount: 500
            },
            {
                name: "Ekstra opgørelse / flytteopgørelse",
                amount: 81.25
            },
            {
                name: "Kopi af faktura",
                amount: 43.75
            },
            {
                name: "Rykkergebyr",
                amount: 100
            }
        ]
    },
    {
        id: "nrgi_indkoebspris",
        name: "NRGi - Indkøbspris",
        link: "https://nrgi.dk/privat/stroem/produkter/bestil-stroem/indkoebspris-bestil/elpris/",
        prices: [
            {
                name: "Spotpris",
                amount: null,
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .037,
                calculated: true,
                conditions: null
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 16.25,
                paymentsPerYear: 12
            },
            {
                name: "Indbetalingskort pr. regning",
                amount: 49
            },
            {
                name: "Betalingsservice pr. regning",
                amount: 8,
                paymentsPerYear: 12
            },
            {
                name: "Gebyr ved kundens skift af leverandør i bindingsperiode",
                amount: 500
            },
            {
                name: "Ekstra opgørelse / flytteopgørelse",
                amount: 81.25
            },
            {
                name: "Kopi af faktura",
                amount: 43.75
            },
            {
                name: "Rykkergebyr",
                amount: 100
            }
        ]
    },
    {
        id: "nettopower",
        name: "nettopower",
        link: "https://www.nettopower.dk/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .10,
                conditions: null
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 0
            },
            {
                name: "Betaling via betalingsservice",
                amount: 0,
                paymentsPerYear: 4
            },
            {
                name: "Bemærk forudbetaling (aconto)"
            }
        ]
    },
    {
        id: "velkommen",
        name: "Velkommen",
        link: "https://velkommen.dk/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .15,
                conditions: null
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 0
            },
            {
                name: "Betaling via betalingsservice",
                amount: 6.6,
                paymentsPerYear: 4
            },
            {
                name: "Bemærk forudbetaling (aconto)"
            }
        ]
    },
    {
        id: "vindstoed_danskvind",
        name: "Vindstød DanskVind",
        link: "https://www.vindstoed.dk/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .005
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 0
            },
            {
                name: "Omkostning/gebyr pr. regning. ved betaling via netbank.",
                amount: 0
            },
            {
                name: "Betaling via betalingsservice",
                amount: 8,
                paymentsPerYear: 4
            },
            {
                name: "Bemærk forudbetaling (aconto)"
            }
        ]
    },
    {
        id: "vindstoed_vestroem",
        name: "Vindstød VEstrøm",
        link: "https://www.vindstoed.dk/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .012
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 0
            },
            {
                name: "Omkostning/gebyr pr. regning. ved betaling via netbank.",
                amount: 0
            },
            {
                name: "Betaling via betalingsservice",
                amount: 8,
                paymentsPerYear: 4
            }
        ]
    },
    {
        id: "vindstoed_lokalvind",
        name: "Vindstød LokalVind",
        link: "https://www.vindstoed.dk/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .005
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 10,
                paymentsPerYear: 12
            },
            {
                name: "Omkostning/gebyr pr. regning. ved betaling via netbank.",
                amount: 0
            },
            {
                name: "Betaling via betalingsservice",
                amount: 8,
                paymentsPerYear: 4
            },
            {
                name: "Bemærk forudbetaling (aconto)"
            }
        ]
    },
    {
        id: "vindstoed_spotvind",
        name: "Vindstød SpotVind",
        link: "https://www.vindstoed.dk/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .19
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 23.20,
                paymentsPerYear: 12
            },
            {
                name: "Omkostning/gebyr pr. regning. ved betaling via netbank.",
                amount: 0
            },
            {
                name: "Betaling via betalingsservice",
                amount: 8,
                paymentsPerYear: 4
            },
            {
                name: "Bemærk forudbetaling (aconto)"
            }
        ]
    },
    {
        id: "vindstoed_elforbundet",
        name: "Elforbundet.dk 2022 – Vindstød",
        link: "https://www.elforbundet.dk/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .0,
                conditions: "Prisen udløber ved aftalens afslutning."
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 0
            },
            {
                name: "Omkostning/gebyr pr. regning. ved betaling via netbank.",
                amount: 0
            },
            {
                name: "Betaling via betalingsservice",
                amount: 8,
                paymentsPerYear: 4
            },
            {
                name: "Bemærk forudbetaling (aconto)"
            }
        ]
    },
    {
        id: "ewii_groen_indkoebspris",
        name: "EWII Grøn Indkøbspris",
        link: "https://www.ewii.dk/privat/el/groen-el/groen-indkoebspris/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .015
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 23.2,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via betalingsservice",
                amount: 4.6
            },
            {
                name: "Betaling via mobilepay",
                amount: 0,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via girokort",
                amount: 39.2
            }
        ]
    },
    {
        id: "gasel",
        name: "Gasel",
        link: "https://www.gasel.dk/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .008
            }
        ],
        fees: [
            {
                name: "Abonnement pr. måned(gennemsnit)",
                amount: 24.3333,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via betalingsservice",
                amount: 4.656
            }
        ]
    },
    {
        id: "aura_flexel",
        name: "AURA FlexEl",
        link: "https://www.aura.dk/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .05
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 16.664,
                paymentsPerYear: 12
            },
            {
                name: "Bemærk forudbetaling (aconto)"
            },
            {
                name: "Omkostning/gebyr pr. regning."
            }
        ]
    },
    {
        id: "ok_el_flex",
        name: "OK El Flex",
        link: "https://www.ok.dk/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .1057
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 0
            },
            {
                name: "Bemærk forudbetaling (aconto)"
            },
            {
                name: "Omkostning/gebyr pr. regning."
            }
        ]
    },
    {
        id: "groen_ok_el_flex",
        name: "Grøn OK El Flex",
        link: "https://www.ok.dk/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .2057
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 0
            },
            {
                name: "Omkostning/gebyr pr. regning."
            },
            {
                name: "Bemærk forudbetaling (aconto)"
            }
        ]
    },
    {
        id: "norlys_flexel",
        name: "Norlys FlexEl",
        link: "https://norlys.dk/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .036,
                calculated: true
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 23.2,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via betalingsservice",
                amount: 0
            },
            {
                name: "Betaling via indbetalingskort",
                amount: 39.2
            },
            {
                name: "Bemærk forudbetaling (aconto)"
            }
        ]
    },
    {
        id: "andel_energi_variabel_pris",
        name: "andel energi - Variabel pris",
        link: "https://andelenergi.dk/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: 0.004,
                calculated: true
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 31.96,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via betalingsservice",
                amount: 5
            },
            {
                name: "Bemærk forudbetaling (aconto)"
            }
        ]
    },
    {
        id: "gnp_energy_fordel_plus_el",
        name: "GNP Energy - Fordel Plus el",
        link: "https://dk.gnp.energy/produkter/fordel-plus/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Spotpris tillæg",
                amount: 0.048,
                calculated: true
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 20,
                paymentsPerYear: 12
            },
            {
                name: "Betaling - pr. udstedt faktura - kun frem til kunden tilmelder sig NETS-betaling af faktura, herefter bortfalder hele gebyret.",
                amount: 23.2

            },
            {
                name: "Betaling via betalingsservice",
                amount: 0
            },
            {
                name: "Bemærk forudbetaling (aconto)"
            },
            {
                name: "Binding i 6 måneder!"
            }
        ]
    },
    {
        id: "sef_energi_as_fleksvind",
        name: "SEF Energi A/S - FleksVIND",
        link: "https://www.sef.dk/privat/el/fleksvind/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Spotpris tillæg",
                amount: 0.22,
                calculated: true
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 23.2,
                paymentsPerYear: 12
            },
            {
                name: "Betaling - pr. udstedt faktura - kun frem til kunden tilmelder sig NETS-betaling af faktura, herefter bortfalder hele gebyret.",
                amount: 39.2

            },
            {
                name: "Betaling via betalingsservice",
                amount: 4.8,
                paymentsPerYear: 12
            },
            {
                name: "Bemærk forudbetaling (aconto)"
            }
        ]
    },
    {
        id: "clever",
        name: "Clever Power",
        link: "https://clever.dk/produkter/clever-power/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: 0
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 39.2,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via betalingsservice",
                amount: 0
            }
        ]
    },
    {
        id: "watts",
        name: "Watts",
        link: "https://watts.dk/",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: 0
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 23.2,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via betalingskort",
                amount: 0
            },
            {
                name: "Betaling via betalingsservice",
                amount: 5
            },
            {
                name: "Bemærk forudbetaling (aconto)"
            },
            {
                name: "Watts tager ikke nye kunder"
            }
        ]
    }
]
