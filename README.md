# Elspotpris
[Elspotpris.dk](https://elspotpris.dk) er et fællesskabsdrevet website, der viser variable elpriser og giver mulighed for at sammenligne elselskaber med variabel pris. 
Priser for elselskaberne vedligeholdes manuelt. 
Priser, tillæg og gebyrer verificeres og stikprøvekontrolleres på elregninger, der indsendes af forbrugerne.

## Sammenlign elselskaber på deres faktiske pris
På grund af manglende lovgivning om, hvordan en variabel pris udregnes og præsenteres af elselskaberne, har Elspotpris.dk en sammenligningsside, hvor elselskaber sammenlignes på deres faktiske pris.

## Tilføj produkter fra elselskaber
Hvis du ønsker at tilføje eller rette priser fra elselskaber, kan dette gøres nemt. Filen [elspotpris.app/src/prices.js](https://github.com/rndfm/elspotpris/blob/master/elspotpris.app/src/prices.js) indeholder alle definitionerne for elprodukterne. Rediger filen og send en pull request. Det er nemmere end det lyder, og du kan ikke ødelægge noget. Ændringen vil blive verificeret, før den går live.

[Link til prisfilen](https://github.com/rndfm/elspotpris/blob/master/elspotpris.app/src/prices.js)

## Lokalt udviklingsmiljø

Brug [NPM](https://www.npmjs.com/) til at starte projektet. For at køre hele projektet, skal både app'en og API'et startes. Klienten (app'en) består af en SvelteKit-app, mens API'et er baseret på NodeJS.

For at starte serveren skal du gå ind i mappen elspotpris.api og køre følgende kommandoer:

```bash
cd .\elspotpris.api\
npm install
npm run start
```

For at køre app'en skal du først gå ind i mappen elspotpris.app og køre følgende kommandoer:

```bash
cd .\elspotpris.app\
npm install
npm run dev
```

App'en kan nu ses på http://localhost:4000

## Bidrag til udviklingen og vedligeholdelsen af elspotpris.dk
Pull requests er meget velkomne. For større ændringer, åben gerne et issue først for at afklare hvad du ønsker at ændre eller udvikle.

## License
[MIT](https://choosealicense.com/licenses/mit/)
