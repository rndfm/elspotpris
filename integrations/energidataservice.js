const { Console } = require('console');
const https = require('https');

const apiUrl = 'https://data-api.energidataservice.dk/v1/graphql';

async function getPrices() {
    const query = `
        query Dataset($startDate: timestamptz!) {
            elspotprices(where:{HourUTC: {_gte: $startDate}}) {
                HourUTC
                HourDK
                PriceArea
                SpotPriceDKK
            }
        }
    `;

    var startDate = new Date();
    startDate.setHours(startDate.getHours() - 24, 0, 0, 0);

    const variables = { "startDate": startDate };

    return await postGraph(query, variables).catch(e => {
        console.log(e);
    });;
}

async function getCo2Emis() {
    const query = `
        query Dataset($startDate: timestamptz!) {
            co2emis(where:{Minutes5UTC: {_gte: $startDate}}) {
                Minutes5UTC
                Minutes5DK
                PriceArea
                CO2Emission
            }
        }
    `;

    var startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const variables = { "startDate": startDate };

    return await postGraph(query, variables).catch(e => {
        console.log(e);
    });
}

async function getCo2EmisPrognosis() {
    const query = `
        query Dataset($startDate: timestamptz!) {
            co2emisprog(where:{Minutes5UTC: {_gte: $startDate}}) {
                Minutes5UTC
                Minutes5DK
                PriceArea
                CO2Emission
            }
        }
    `;

    var startDate = new Date();
    startDate.setHours(startDate.getHours() - 1);
    const variables = { "startDate": startDate };

    result = await postGraph(query, variables).catch(e => {
        console.log(e);
    });

    return result;
}

async function postGraph(query, variables)
{
    bodyData = JSON.stringify({
        query: query,
        variables: variables,
        operationName: 'Dataset'
    });

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': bodyData.length,
        },
        timeout: 10000, // in ms
      }
    
    return new Promise((resolve, reject) => {
    const req = https.request(apiUrl, options, (res) => {
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

    req.write(bodyData)
    req.end()
    });
}


module.exports = {
    getPrices,
    getCo2Emis,
    getCo2EmisPrognosis
}