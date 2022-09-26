const { Console } = require('console');
const https = require('https');

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const apiUrl = 'https://www.nordpoolgroup.com/api/marketdata/page/41';

async function getPrices() {

    // get today
    var today = new Date();
    today.setHours(0,0,0,0);
    var pricesToday = await getPricesForDate(today).catch(e => {
        console.log(e);
        return;
    });

    // get tomorrow
    var tomorrow = today.addDays(1);
    var pricesTomorrow = await getPricesForDate(tomorrow).catch(e => {
        console.log(e);
    });
    
    if (pricesTomorrow == null || pricesTomorrow.some(p => p.prices.some(ap => isNaN(ap.price))))
    {
        console.log("Some prices for tomorrow are NaN.");
        // get prices for yesterday
        var yesterday = today.addDays(-1);
        var pricesYesterday = await getPricesForDate(yesterday).catch(e => {
            console.log(e);
            return pricesToday;
        });
        
        return { prices: pricesYesterday.concat(pricesToday), lastDate: today };
    }

    return { prices: pricesToday.concat(pricesTomorrow), lastDate: tomorrow };
}

async function getPricesForDate(date)
{
    var datestring = ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + date.getFullYear();
    var url = `${apiUrl}?enddate=${datestring}&currency=DKK`;
    console.log(url);

    var response = await getData(url);
    var json = JSON.parse(response);

    var prices = json.data.Rows.filter(row => !row.IsExtraRow).map(row => ({ hour: row.StartTime, prices: row.Columns.map(col => ({ area: col.Name, price: Number.parseFloat(col.Value.replace(' ','').replace(',','.')) }))}));
    return prices;
}

async function getData(url)
{
    const options = {
        method: 'GET',
        timeout: 10000, // in ms
    }
    
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
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

module.exports = {
    getPrices
}