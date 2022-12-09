const { Console } = require('console');
const https = require('https');

const apiUrl = 'https://api.energidataservice.dk/dataset';

async function getPrices() {
    var startDate = new Date();
    startDate.setHours(startDate.getHours() - 24, 0, 0, 0);

    const query = `start=${toCustomISOString(startDate)}`;

    return await request('Elspotprices', query).catch(e => {
        console.log(e);
    });
}

async function getCo2Emis() {
    var startDate = new Date();
    startDate.setHours(startDate.getHours() - 12);

    const query = `start=${toCustomISOString(startDate)}`;

    return await request('CO2Emis', query).catch(e => {
        console.log(e);
    });
}

async function getCo2EmisPrognosis() {
    var startDate = new Date();
    startDate.setHours(startDate.getHours() - 1);

    const query = `start=${toCustomISOString(startDate)}&sort=Minutes5UTC&timezone=utc`;

    return await request('CO2EmisProg', query).catch(e => {
        console.log(e);
    });
}

async function getNetCompanyEntities(gln, chargeTypeCode)
{
    var startDate = new Date();
    startDate.setDate(1)
    startDate.setMonth(0);
    startDate.setHours(1, 0, 0, 0);

    const query = `&start=${toCustomISOString(startDate)}&limit=10000000&filter=%7B"GLN_Number":["${gln}"],"ChargeTypeCode":["${chargeTypeCode}"]%7D&sort=ValidFrom%20DESC&timezone=dk`;

    const data = await request('DatahubPricelist', query).catch(e => {
        console.log(e);
    });

    if (data)
    {
        var json = JSON.parse(data);
        
        const now = new Date();
        const filtered = json.records
            .filter(t => 
                new Date(t.ValidFrom) <= now &&
                (t.ValidTo == null || new Date(t.ValidTo) >= now)
            );

        const entities = filtered.map(item => ({ 
            company: item.ChargeOwner,
            type: item.ChargeTypeCode,
            note: item.Note,
            description: item.Description,
            validFrom: item.ValidFrom,
            validTo: item.ValidTo,
            prices: getPricePeriodsFromTable(item)
        }));

        const filteredEntities = entities.filter(c => c.prices.some(p => p.price > 0));

        return filteredEntities;
    }
}



async function getTransportCompanies()
{
    var startDate = new Date();
    startDate.setDate(1)
    startDate.setMonth(0);
    startDate.setHours(1, 0, 0, 0);

    const query = `&start=${toCustomISOString(startDate)}&limit=10000000&filter=%7B%22ChargeType%22:%22D03%22%7D&sort=ValidFrom%20DESC&timezone=dk`;

    const data = await request('DatahubPricelist', query).catch(e => {
        console.log(e);
    });

    if (data)
    {
        var json = JSON.parse(data);
        

        const now = new Date();

        const badWords = [' a ', ' b ', 'a lav', 'a-lav', 'a høj', 'a-høj', 'b lav', 'b-lav', 'b høj', 'b-høj', 'b1', 'b2', 'a1', 'a2']

        const filtered = json.records
            .filter(t => 
                new Date(t.ValidFrom) <= now &&
                (t.ValidTo == null || new Date(t.ValidTo) >= now) &&
                !badWords.some(word => t.Note.toLowerCase().includes(word))
                );
        

        const companies = filtered.map(item => ({ 
            company: item.ChargeOwner, 
            type: item.ChargeTypeCode, 
            note: item.Note,
            description: item.Description,
            validFrom: item.ValidFrom,
            validTo: item.ValidTo,
            prices: getPricePeriodsFromTable(item)
        }));

        const filteredCompanies = companies.filter(c => c.prices.some(p => p.price > 0));

        console.log(filteredCompanies.length);

        const fs = require('fs');
        let jsondata = JSON.stringify(filteredCompanies);
        fs.writeFileSync('companies.json', jsondata);
    }
}

function getPricePeriodsFromTable(item)
{
    const prices = Object.getOwnPropertyNames(item)
        .filter(propertyName => propertyName.startsWith("Price"))
        .map(propertyName => item[propertyName]);

    const pricePeriods = [];
    var lastPrice = null;
    var currentPeriod = null;
    var timeOfDay = 0;
    prices.forEach(price => {
        if (price == null)
            price = prices[0]; // according to energidataservice: if a price is null the price from first hour apply.

        if (price != lastPrice && currentPeriod != null) // if price changes a new price period starts!
        {
            pricePeriods.push(currentPeriod);
            currentPeriod = null;
        }

        if (currentPeriod == null)
            currentPeriod = { start: timeOfDay, price: price };
        
            currentPeriod.end = timeOfDay;
        lastPrice = price;
        timeOfDay++;
    });

    pricePeriods.push(currentPeriod);

    return pricePeriods;
}


async function getTransportTariffs()
{
    const monitoredChargeTypeCodes = ['HEV-NT-01', 'DT_C_01']
    var startDate = new Date();
    startDate.setDate(1);
    startDate.setMonth(0);
    startDate.setHours(1, 0, 0, 0);

    var endDate = new Date();
    
    console.log(startDate);
    const query = `limit=100000&start=${toCustomISOString(startDate)}&end=${toCustomISOString(endDate)}&filter=%7B%22Note%22:%22Nettarif%20C%20time%22%7D&sort=ValidFrom%20ASC&timezone=utc`;

    const data = await request('DatahubPricelist', query).catch(e => {
        console.log(e);
    });

    if (data)
    {
        var json = JSON.parse(data);

        const now = new Date();
        const filtered = json.records
            .filter(t => 
                new Date(t.ValidFrom) <= now &&
                new Date(t.ValidTo) >= now);

        filtered.forEach((e) => {
            console.log(`${e.ChargeOwner} \t\t - Fra ${e.ValidFrom} - ${e.ValidTo} : ${e.Price1}`);
        });
    }
}

async function request(dataset, query)
{
    const requestUrl = `${apiUrl}/${dataset}?${query}`;
    const options = {
        method: 'GET',
        timeout: 10000, // in ms
    }
    
    console.log(requestUrl);
    return new Promise((resolve, reject) => {
        const req = https.request(requestUrl, options, (res) => {
            if (res.statusCode < 200 || res.statusCode > 299) {
                return reject(new Error(`HTTP status code ${res.statusCode}`))
            }

            const body = []
            res.on('data', (chunk) => body.push(chunk))
            res.on('end', () => {
            const resString = Buffer.concat(body).toString()
                resolve(resString)
            })
        })

        req.on('error', (err) => {
            reject(err)
        })

        req.on('timeout', () => {
            req.destroy()
            reject(new Error('Request time out'))
        })

        req.end()
    });
}

function toCustomISOString(date) {
    var pad = function(num) {
        return (num < 10 ? '0' : '') + num;
    };
  
    return date.getFullYear() +
        '-' + pad(date.getUTCMonth() + 1) +
        '-' + pad(date.getUTCDate()) +
        'T' + pad(date.getUTCHours()) +
        ':' + pad(date.getUTCMinutes());
  }


module.exports = {
    getPrices,
    getCo2Emis,
    getCo2EmisPrognosis,
    getTransportTariffs,
    getTransportCompanies,
    getNetCompanyEntities
}