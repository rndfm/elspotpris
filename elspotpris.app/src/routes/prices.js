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
        normal: .2475,
        peak: .6164
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
        // from 2022-11-01 increase: https://n1.dk/priser-og-vilkaar/kommende-priser-1-11-2022 
        // from 2023-01-01 increase: https://n1.dk/priser-og-vilkaar/kommende-priser-1-1-2023
        // Updated 2022-09-24 - https://n1.dk/priser-og-vilkaar
        // normal: .3875,
        // peak: .9734
        normal: 0, // Only for december 2022
        peak: 0 // Only for december 2022
    },
    {
        id: "n1_evonet_c",
        name: "N1 (tidl. Evonet) C",
        //normal: .2114,
        //peak: .6933
        normal: 0, // Only for december 2022
        peak: 0 // Only for december 2022
    },
    {
        id: "n1_randers_c",
        name: "N1 Randers C",
        // Updated 2022-12-01 - https://n1.dk/priser-og-vilkaar
        normal: .5547,
        peak: 1.236
    },
    {
        id: "dinel_c",
        name: "Dinel C",
        // Updated 2022-10-24 - https://dinel.dk/priser-og-bestemmelser/
        normal: .1636,
        peak: .4537
    },
    {
        id: "trefor_el-net_c",
        name: "Trefor El-net C",
        normal: .2068,
        peak: .5404
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
    },
    {
        id: "elnet_midt_c",
        name: "Elnet midt C",
        // Updated 2023-10-05 - https://www.elnetmidt.dk/priser
        normal: .2191,
        peak: .6562
    },
    {
        id: "elvrk_c",
        name: "Elværk C",
        // From 2023-01-01 decrease:  normal: .2330;, peak: .7206
        // Updated 2022-09-24 - https://www.elvrk.dk/forside/priser/
        normal: .3947,
        peak: 1.2997
    },
    {
        id: "hurup_elvrk_net_c",
        name: "Hurup Elværk Net C",
        // Updated 2022-09-24 - http://www.hev.dk/faste-afgifter/
        normal: .15,
        peak: .15
    },
    {
        id: "veksel",
        name: "Veksel C",
        // kilde: https://www.veksel.dk/priser/nettarif-og-abonnementer/
        normal: .2199,
        peak: .6564
    },
    {
        id: "vores_elnet",
        name: "Vores Elnet C",
        normal: .3676,
        peak: .8995
    },
    {
        id: "netselskabet_elvaerk_c",
        name: "Netselskabet Elværk C",
        normal: .3947,
        peak: 1.2997
    },
    {
        id: "nord_energi_net",
        name: "Nord Energi Net",
        normal: .1350,
        peak: .1350
    },
    {
        // source: https://noe.dk/wp-content/uploads/2022/10/Prisblad_gaeldende_fra_d._1._januar_2022.pdf
        id: "noe_net",
        name: "Nordvestjysk Elforsyning (NOE Net)",
        normal: .0805,
        peak: .0805
    },
    {
        id: "ikast_el_net_as_c",
        name: "Ikast El Net A/S",
        // source: https://ikastelnet.dk/priser/gebyrer/
        normal: .3309,
        peak: .3309
    },
    {
        id: "flow_elnet",
        name: "Flow Elnet",
        // Updated 2022-12-20 - https://flow-elnet.dk/priser-regler/aktuelle-priser
        // From 2023-01-01 normal: .2224, peak: .5835
        // From 2023-04-01 normal: .3977, peak: .9521
        normal: .2241,
        peak: .5871
    }
]

export const governmentTariffs = [
    {
        id: "elafgift",
        name: "Elafgift",
        amount: .723,
    }
]

export const transmissionTariffs = [
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
    }
]

export const consumptionTypes = [
    {
        id: "apartment_small",
        name: "Lejlighed op til 80 kvm (ca 2000 kWh)",
        amount: 2000
    },
    {
        id: "apartment_large",
        name: "Lejlighed over 80 kvm (ca 3000 kWh)",
        amount: 3000
    },
    {
        id: "house_small",
        name: "Hus op til 130 kvm (ca 4000 kWh)",
        amount: 4000
    },
    {
        id: "house_large",
        name: "Hus over 130 kvm (ca 6000 kWh)",
        amount: 6000
    },
    {
        id: "house_large_heatpump",
        name: "Hus med varmepumpe (ca 10000 kWh)",
        amount: 10000
    },
    {
        id: "house_large_electric_heat",
        name: "Hus med elvarme (ca 18000 kWh)",
        amount: 18000
    },
    {
        id: "cottage",
        name: "Sommerhus (ca. 2000 kWh)",
        amount: 2000
    },
    {
        id: "custom",
        name: "Indtast selv forbrug",
        amount: null
    }
]

export const products = [
    {
        id: "spotpris",
        name: "Spotpris",
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
        payments: "Forbrugsafregnet månedligt",
        prices: [
            {
                name: "Spotpris",
                amount: null,
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .0384,
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
                amount: 13,
                paymentsPerYear: 12
            },
            {
                name: "Indbetalingskort pr. regning",
                amount: 39.2
            },
            {
                name: "Betalingsservice pr. regning",
                amount: 6.4,
                paymentsPerYear: 12
            },
            {
                name: "Gebyr ved kundens skift af leverandør i bindingsperiode",
                amount: 400
            },
            {
                name: "Ekstra opgørelse / flytteopgørelse",
                amount: 65
            },
            {
                name: "Kopi af faktura",
                amount: 35
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
        payments: "Forbrugsafregnet månedligt",
        prices: [
            {
                name: "Spotpris",
                amount: null,
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .0384,
                calculated: true,
                conditions: null
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 31.2,
                paymentsPerYear: 12
            },
            {
                name: "Indbetalingskort pr. regning",
                amount: 39.2
            },
            {
                name: "Betalingsservice pr. regning",
                amount: 6.4,
                paymentsPerYear: 12
            },
            {
                name: "Gebyr ved kundens skift af leverandør i bindingsperiode",
                amount: 400
            },
            {
                name: "Ekstra opgørelse / flytteopgørelse",
                amount: 65
            },
            {
                name: "Kopi af faktura",
                amount: 35
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
        payments: "Acontobetaling kvartalsvis",
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
            }
        ]
    },
    {
        id: "velkommen",
        name: "Velkommen",
        link: "https://velkommen.dk/",
        payments: "Acontobetaling kvartalsvis",
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
            }
        ]
    },
    {
        id: "vindstoed_danskvind",
        name: "Vindstød DanskVind",
        link: "https://www.vindstoed.dk/",
        payments: "Acontobetaling kvartalsvis",
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
            }
        ]
    },
    {
        id: "vindstoed_vestroem",
        name: "Vindstød VEstrøm",
        link: "https://www.vindstoed.dk/",
        payments: "Forbrugsafregnet kvartalsvis",
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
        payments: "Acontobetaling kvartalsvis",
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
            }
        ]
    },
    {
        id: "vindstoed_spotvind",
        name: "Vindstød SpotVind",
        link: "https://www.vindstoed.dk/",
        payments: "Acontobetaling kvartalsvis",
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
            }
        ]
    },
    {
        id: "vindstoed_elforbundet",
        name: "Elforbundet.dk 2022 – Vindstød",
        link: "https://www.elforbundet.dk/",
        payments: "Acontobetaling kvartalsvis",
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
            }
        ]
    },
    {
        id: "ewii_groen_indkoebspris",
        name: "EWII Grøn Indkøbspris",
        link: "https://www.ewii.dk/privat/el/groen-el/groen-indkoebspris/",
        payments: "Forbrugsafregnet månedligt",
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
        payments: "Forbrugsafregnet månedligt",
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
        payments: "Acontobetaling månedligt",
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
                name: "Omkostning/gebyr pr. regning."
            }
        ]
    },
    {
        id: "ok_el_flex",
        name: "OK El Flex",
        link: "https://www.ok.dk/",
        payments: "Acontobetaling månedligt",
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
                name: "Omkostning/gebyr pr. regning."
            }
        ]
    },
    {
        id: "groen_ok_el_flex",
        name: "Grøn OK El Flex",
        link: "https://www.ok.dk/",
        payments: "Acontobetaling månedligt",
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
            }
        ]
    },
    {
        id: "norlys_flexel",
        name: "Norlys FlexEl",
        link: "https://norlys.dk/",
        payments: "Acontobetaling månedligt",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .03544,
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
            }
        ]
    },
    {
        id: "andel_energi_variabel_pris",
        name: "andel energi - Variabel pris",
        link: "https://andelenergi.dk/",
        payments: "Acontobetaling månedligt",
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
                name: "Der er stoppet for salg af produktet hos Andel Energi"
            }
        ]
    },
    {
        id: "gnp_energy_fordel_plus_el",
        name: "GNP Energy - Fordel Plus el",
        link: "https://dk.gnp.energy/produkter/fordel-plus/",
        payments: "Acontobetaling månedligt",
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
                name: "Binding i 6 måneder!"
            }
        ]
    },
    {
        id: "sef_energi_as_fleksvind",
        name: "SEF Energi A/S - FleksVIND",
        link: "https://www.sef.dk/privat/el/fleksvind/",
        payments: "Acontobetaling månedligt",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Spotpris tillæg",
                amount: 0.112
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
            }
        ]
    },
    {
        id: "clever",
        name: "Clever Power",
        link: "https://clever.dk/produkter/clever-power/",
        payments: "Forbrugsafregnet månedligt",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: 0.008
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
        payments: "Acontobetaling månedligt",
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
                name: "Watts tager ikke nye kunder"
            }
        ]
    },
    {
        id: "kernfull",
        name: "Kärnfull",
        link: "https://dk.karnfull.com/",
        payments: "Forbrugsafregnet månedligt",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Spotpris tillæg",
                amount: .024
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 31.2,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via betalingskort",
                amount: 28
            },
            {
                name: "Betaling via betalingsservice",
                amount: 6.4,
                paymentsPerYear: 12
            },
            {
                name: "Rykkergebyr",
                amount: 80
            }
        ]
    },
    {
        id: "modstroem_g",
        name: "Modstrøm Grundprodukt",
        link: "https://www.modstroem.dk/privat/bliv-kunde/",
        payments: "Forbrugsafregnet månedligt",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Spotpris tillæg",
                amount: .15
            },
            {
                name: "Tillæg til transport",
                amount: .11
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 39.2,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via betalingskort",
                amount: 32
            },
            {
                name: "Betaling via betalingsservice",
                amount: 7.96,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via Bankoverførsel",
                amount: 80
            },
            {
                name: "Rykkergebyr",
                amount: 80
            }
        ]
    },
    {
        id: "verdo_variabel_timepris",
        name: "Verdo Variabel Timepris",
        link: "https://www.verdo.com/dk/elsalg-privat/",
        payments: "Acontobetaling 2 måneder",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Spotpris tillæg",
                amount: .06
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 20,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via betalingsservice",
                amount: 7.2
            },
            {
                name: "Betaling via MobilePay",
                amount: 0,
                paymentsPerYear: 12
            }
        ]
    },
    {
        id: "jysk_energi_fdm-stroem",
        name: "Jysk Energi - FDM Strøm",
        link: "https://fdm.dk/vi-tilbyder/groen-el-fdm-stroem",
        payments: "Acontobetaling kvartalsvis",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "handelsomkostninger",
                amount: .0025
            },
            {
                name: "grønt tiltag",
                amount: .025
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 16,
                paymentsPerYear: 12
            },
            {
                name: "Indbetalingskort pr. regning",
                amount: 39.2
            },
            {
                name: "Betalingsservice pr. regning",
                paymentsPerYear: 4,
                amount: 6
            },
            {
                name: "Gebyr ved kundens skift af leverandør i bindingsperiode",
                amount: 400
            },
            {
                name: "Ekstra opgørelse / flytteopgørelse",
                amount: 80
            },
            {
                name: "Kopi af faktura (e-mail)",
                amount: 0
            },
            {
                name: "Rykkergebyr",
                amount: 100
            }
        ]
    },
    {
        id: "oe_stroem",
        name: "Ø-Strøm - SpotEL",
        link: "https://www.xn---strm-uuae.dk/elprodukter-fra-oe/stroem/spotel/",
        payments: "Forbrugsafregnet månedligt",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: 0.08,
                calculated: true
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 10,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via betalingsservice",
                amount: 5,
                paymentsPerYear: 12
            }
        ]
    },
    {
        id: "energi_fyn_spotel",
        name: "Energi Fyn - SpotEl",
        link: "https://www.energifyn.dk/privat/el/spotel/",
        payments: "Forbrugsafregnet månedligt",
        prices: [
            {
                name: "Spotpris",
                amount: null,
            },
            {
                name: "Spotpris tillæg",
                amount: 0.04,
            },
            {
                name: "Abonnement pr. kWh",
                amount: 0.036,
            }
        ],
        fees: [
            {
                name: "Betaling via betalingsservice",
                amount: 4.984,
                paymentsPerYear: 12
            },
            {
                name: "MobilePay pr. regning",
                amount: 2.6
            },
            {
                name: "Abonnement",
                amount: 12,
                paymentsPerYear: 12
            },
        ]
    },
    {
        id: "jysk_energi_min-stroem",
        name: "Jysk Energi - Min Strøm",
        link: "https://jyskenergi.dk/el/privat/min-stroem/",
        payments: "Acontobetaling kvartalsvis",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Spotpris tillæg",
                amount: 0.04
            },
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 12,
                paymentsPerYear: 12
            },
        ]
    },
    {
        id: "andel_energi_timeenergi",
        name: "andel energi - TimeEnergi",
        link: "https://andelenergi.dk/",
        payments: "Acontobetaling kvartalsvis",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: 0.161,
                calculated: true
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 12.8,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via betalingsservice",
                amount: 5
            },
            {
                name: "Betaling via MobilePay",
                amount: 0
            }
        ]
    },
    {
        id: "forsyning_helsingoer_kronborg_el",
        name: "Forsyning Helsingør - Kronborg El",
        link: "https://www.fh.dk/el/kronborg-el",
        payments: "Acontobetaling kvartalsvis",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Indkøbsomkostninger Øst (variabel)*",
                amount: .1056,
                conditions: null
            },
            {
                name: "Handelstillæg",
                amount: .04
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 9.6,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via betalingsservice",
                amount: 0,
                conditions: "Ikke bekræftet"
            }
        ]
    },
    {
        id: "forsyning_helsingoer_kronborg_el_plus",
        name: "Forsyning Helsingør - Kronborg El+",
        link: "https://www.fh.dk/el/kronborg-el",
        payments: "Acontobetaling kvartalsvis",
        prices: [
            {
                name: "Spotpris",
                amount: null
            },
            {
                name: "Indkøbsomkostninger Øst (variabel)*",
                amount: .1056,
                conditions: null
            }
        ],
        fees: [
            {
                name: "Abonnement",
                amount: 24,
                paymentsPerYear: 12
            },
            {
                name: "Betaling via betalingsservice",
                amount: 0,
                conditions: "Ikke bekræftet"
            }
        ]
    }
]
