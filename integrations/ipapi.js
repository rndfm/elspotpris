const http = require('http')

const apiUrl = 'http://ip-api.com/json'
const defaultRegion = 'DK2'

/*
    Gets region by IP address by lookup at IP-Api.com for postal code.
    Postal code >= 5000 DK1, postal code < 5000 DK2.
    Expect result in 1 sec or will fall back to default region.
    Rate limit is 45 lookups/min for non-profit - if rate limited,
    fall back to default region.
*/
async function getRegion(ipAddress) {
    console.log(ipAddress)

    const options = {
        method: 'GET',
        timeout: 1000, // in ms
    }

    return new Promise((resolve, reject) => {
        const url = `${apiUrl}/${ipAddress}?fields=49186` // fields = status,message,countryCode,zip
        const req = http.request(url, options, (res) => {
            if (res.statusCode < 200 || res.statusCode > 299) {
                return reject(new Error(`HTTP status code ${res.statusCode}`))
            }

            const body = []

            res.on('data', (chunk) => body.push(chunk))

            res.on('end', () => {
                const resString = Buffer.concat(body).toString()
                const res = JSON.parse(resString)
                console.log(res)

                if (res.status && res.status == 'success' &&
                    res.countryCode && res.countryCode == 'DK' &&
                    res.zip && !isNaN(res.zip))
                {
                    const region = parseInt(res.zip) >= 5000 ? 'DK1' : 'DK2'
                    resolve(region)
                } else {
                    console.error(new Error(`Fail or invalid response data: ${res.message ?? 'Unknown'}`))
                    resolve(defaultRegion)
                }
            })
        })

        req.on('error', (err) => {
            reject(err)
        })

        req.on('timeout', () => {
            req.destroy()
            console.error(new Error('Request time out'))
            resolve(defaultRegion)
        })

        req.end()
    })
}

module.exports = {
    getRegion
}