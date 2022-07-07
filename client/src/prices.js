export const tariffs = [
    {
        id: "none",
        name: "uden netselskab",
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
        amount: .903,
    },
    {
        id: "pso",
        name: "PSO-tarif",
        amount: .044,
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

export const companies = [
    {
        id: "nrgi",
        name: "NRGi",
        description: "",
        website: "https://nrgi.dk"
    },
    {
        id: "nettopower",
        name: "nettopower",
        description: "",
        website: "https://nettopower.dk"
    },
    {
        id: "vindstoed",
        name: "vindstød",
        description: "",
        website: "https://www.vindstoed.dk/"
    }
]

export const products = [
    {
        id: "spotpris",
        name: "ren spotpris",
        companyId: null,
        prices: [
            {
                name: "spotpris",
                amount: null
            }
        ]
    },
    {
        id: "nrgi_bevarmigel",
        name: "NRGi - Bevar-Mig-El",
        companyId: "nrgi",
        prices: [
            {
                name: "spotpris",
                amount: null,
            },
            {
                name: "fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .037,
                calculated: true,
                conditions: null
            },
            {
                name: "grønt tiltag - plate træer",
                amount: .08,
                conditions: "fast pris i aftalen"
            }
        ],
        fees: [
            {
                name: "abonnement",
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
        companyId: "nrgi",
        prices: [
            {
                name: "spotpris",
                amount: null,
            },
            {
                name: "fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .037,
                calculated: true,
                conditions: null
            }
        ],
        fees: [
            {
                name: "abonnement",
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
        id: "nrgi_kvartal",
        name: "NRGi - Kvartal med klima",
        companyId: "nrgi",
        prices: [
            {
                name: "elpris kvartal",
                amount: 1.896,
                region: "DK1"
            },
            {
                name: "elpris kvartal",
                amount: 1.92,
                region: "DK2"
            }
        ],
        fees: [
            {
                name: "abonnement",
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
        companyId: "nettopower",
        prices: [
            {
                name: "spotpris",
                amount: null
            },
            {
                name: "fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .10,
                conditions: null
            }
        ],
        fees: [
            {
                name: "abonnement",
                amount: 0
            },
            {
                name: "Månedlig betaling/gebyr pr. regning.",
                amount: 19
            }
        ]
    },
    {
        id: "vindstoed_elforbundet",
        name: "Vindstød Elforbundet",
        companyId: "vindstoed",
        prices: [
            {
                name: "spotpris",
                amount: null
            },
            {
                name: "fortjeneste, balanceomkostninger, profilomkostninger og handelsomkostninger",
                amount: .0,
                conditions: "Prisen udløber ved aftalens afslutning."
            }
        ],
        fees: [
            {
                name: "abonnement",
                amount: 0
            },
            {
                name: "omkostning/gebyr pr. regning.",
            }
        ]
    }
]
