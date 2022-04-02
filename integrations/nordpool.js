const https = require('https');

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const apiUrl = 'https://www.nordpoolgroup.com/api/marketdata/page/41';

async function getPrices() {

    //get today
    var today = new Date();
    var pricesToday = await getPricesForDate(today);

    //get tomorrow
    var tomorrow = today.addDays(1);
    var pricesTomorrow = await getPricesForDate(tomorrow);

    return pricesToday.concat(pricesTomorrow);
}

async function getPricesForDate(date)
{
    var datestring = ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + date.getFullYear();
    var url = `${apiUrl}?enddate=${datestring}&currency=dkk`;
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