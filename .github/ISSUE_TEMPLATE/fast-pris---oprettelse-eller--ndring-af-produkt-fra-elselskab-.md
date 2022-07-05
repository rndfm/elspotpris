---
name: Fast pris - Oprettelse eller ændring af produkt fra elselskab.
about: Describe this issue template's purpose here.
title: "[PRODUKT]"
labels: product
assignees: rndfm

---

Udfyld felterne nedenunder.
Alle priser uden moms angiver i kroner.    .15 = 0.15 kr = 15 øre.
Hvis der findes yderligere pristillæg eller gebyrer tilføjes det i samme stil.
Bemærk at udregningen ligger samtlige priser sammen. Vil der gøres opmærksom på en ting som der gratis/ikke betales for kan der laves priser og gebyrer med 0 i "amount".

Priser kan angives med region hvis de er forskellige fra DK1 og DK2.
Angiv både pris for DK1 og DK2.
Hvis prisen er den samme fra begge regioner angives blot en pris uden region på.

{
    name: "Navn på elselskab og produktnavn",
    prices: [
            {
                name: "elpris fast DK1",
                amount: 1.896,
                region: "DK1"
            },
            {
                name: "elpris fast DK2",
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
}
