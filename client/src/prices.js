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
        id: "n1_c",
        name: "N1 C",
        normal: .1832,
        peak: .5437
    },
    {
        id: "dinel_c",
        name: "Dinel C",
        normal: .1112,
        peak: .3462
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
        amount: .0049,
    },
]

export const products = [
    {
        id: "spotpris",
        name: "ren spotpris",
        companyId: null,
        prices: [
            {
                name: "Spotpris",
                amount: null
            }
        ]
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
                amount: 16.25
            },
            {
                name: "Indbetalingskort pr. regning",
                amount: 49
            },
            {
                name: "Betalingsservice pr. regning",
                amount: 8
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
                amount: 16.25
            },
            {
                name: "Indbetalingskort pr. regning",
                amount: 49
            },
            {
                name: "Betalingsservice pr. regning",
                amount: 8
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
                name: "Månedlig betaling/gebyr pr. regning.",
                amount: 19
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
                name: "Bemærk forudbetaling (aconto)"
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
                amount: 10
            },
            {
                name: "Omkostning/gebyr pr. regning. ved betaling via netbank.",
                amount: 0
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
                amount: 23.20
            },
            {
                name: "Omkostning/gebyr pr. regning. ved betaling via netbank.",
                amount: 0
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
                amount: 23.2
            },
            {
                name: "Omkostning/gebyr pr. regning."
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
                name: "Abonnement pr dag",
                amount: .8
            },
            {
                name: "Omkostning/gebyr pr. regning."
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
                amount: 16.664
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
            }
        ]
    }
]
