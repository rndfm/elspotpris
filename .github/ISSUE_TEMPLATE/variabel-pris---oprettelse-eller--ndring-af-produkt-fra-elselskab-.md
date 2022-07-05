---
name: Variabel pris - Oprettelse eller ændring af produkt fra elselskab.
about: Denne formular indeholder de udregningsfelter der skal til for at regne et
  produkt fra et elselskab.
title: "[PRODUKT]"
labels: product
assignees: rndfm

---

Udfyld felterne nedenunder.
Alle priser uden moms angiver i kroner.    .15 = 0.15 kr = 15 øre.
Hvis der findes yderligere pristillæg eller gebyrer tilføjes det i samme stil.
Bemærk at udregningen ligger samtlige priser sammen. Vil der gøres opmærksom på en ting som der gratis/ikke betales for kan der laves priser og gebyrer med 0 i "amount".

Hvis der står null ved amount bruges spotprisen.

{
    name: "Navn på elselskab og produktnavn",
    prices: [
        {
            name: "spotpris",
            amount: null,
        },
        {
            name: "fortjeneste,",
            amount: .037
        },
        {
            name: "balanceomkostninger",
            amount: .037
        },
        {
            name: "profilomkostninger",
            amount: .037
        },
        {
            name: "handelsomkostninger",
            amount: .037
        },
        {
            name: "evt grønt tiltag",
            amount: .08
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
