# elspotpris


Elspotpris.dk er et community vedligeholdt website med visning af både variable og faste elpriser.
Se prisen per kWh time for time. Inkl. afgifter, transport, moms.
Som noget nyt kan websitet også vise prisen for et specifik produkt hos en el-leverandør.

## Tilføj produkter fra elselskaber eller tariffer fra netselskaber.
Ønsker du at tilføje eller rette i priser fra elselskaber eller netselskaber kan dette gøres nemt!

I filen [/client/src/prices.js](https://github.com/rndfm/elspotpris/blob/master/client/src/prices.js) findes alle definitionerne for priserne på både tariffer og el produkter.  
Rediger filen og lav et pull request.  
Det er nemmere end det lyder og man kan ikke ødelægge noget. Rettelsen bliver tjekket inden den går live.

[Link til prisfilen](https://github.com/rndfm/elspotpris/blob/master/client/src/prices.js)

## Lokalt udviklingsmiljø

Brug [NPM](https://www.npmjs.com/) til at starte projektet.
For at køre hele projektet skal både app og api startes.
Klienten(app) består af en sveltekit app.
Api er NodeJS.

For at projektet kan kører lokalt skal porten til socketio sættes til 3000 i /elspotpris.app/src/routes/data.js.
Find stedet med (omkring linje 140)
var socket = io();
erstat med
var socket = io(':3000');

Kør app'en i /elspotpris.app mappen.
```bash
cd .\elspotpris.app\
npm install
npm run dev
```

Start server
```bash
cd .\elspotpris.api\
npm install
npm run start
```

## Bidrag til udviklingen og vedligeholdelsen af elspotpris.dk
Pull requests er meget velkomne. For større ændringer, åben gerne et issue først for at afklare hvad du ønsker at ændre eller udvikle.

## License
[MIT](https://choosealicense.com/licenses/mit/)