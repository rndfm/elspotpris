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
    name: "Jysk Energi FDM Strøm",
    prices: [
        {
            name: "FDM Grøn Strøm (kræver FDM medlemsskab)",
            amount: null,
        },
        {
            name: "fortjeneste,",
            amount: .02
        },
        {
            name: "balanceomkostninger",
            amount: .0
        },
        {
            name: "profilomkostninger",
            amount: .0
        },
        {
            name: "handelsomkostninger",
            amount: .0025
        },
        {
            name: "evt grønt tiltag",
            amount: .0
        }
    ],
    fees: [
        {
            name: "abonnement inkl FDM Bonus",
            amount: 18
        },
        {
            name: "Indbetalingskort pr. regning",
            amount: 39.2
        },
        {
            name: "Betalingsservice pr. regning",
            amount: 6
        },
        {
            name: "Gebyr ved kundens skift af leverandør i bindingsperiode",
            amount: 0
        },
        {
            name: "Ekstra opgørelse / flytteopgørelse",
            amount: 80.00
        },
        {
            name: "Kopi af faktura",
            amount: 39,2
        },
        {
            name: "Rykkergebyr",
            amount: 100
        }
    ]
}
