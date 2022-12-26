const { Console } = require("console");
const https = require("https");

const apiUrl = "https://api.energidataservice.dk/dataset";

async function getPrices() {
  var startDate = new Date();
  startDate.setHours(startDate.getHours() - 24, 0, 0, 0);

  const query = `start=${toCustomISOString(startDate)}`;

  return await request("Elspotprices", query).catch((e) => {
    console.log(e);
  });
}

async function getCo2Emis() {
  var startDate = new Date();
  startDate.setHours(startDate.getHours() - 12);

  const query = `start=${toCustomISOString(startDate)}`;

  return await request("CO2Emis", query).catch((e) => {
    console.log(e);
  });
}

async function getCo2EmisPrognosis() {
  var startDate = new Date();
  startDate.setHours(startDate.getHours() - 1);

  const query = `start=${toCustomISOString(
    startDate
  )}&sort=Minutes5UTC&timezone=utc`;

  return await request("CO2EmisProg", query).catch((e) => {
    console.log(e);
  });
}

async function request(dataset, query) {
  const requestUrl = `${apiUrl}/${dataset}?${query}`;
  const options = {
    method: "GET",
    timeout: 10000, // in ms
  };

  console.log(requestUrl);
  return new Promise((resolve, reject) => {
    const req = https.request(requestUrl, options, (res) => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        return reject(new Error(`HTTP status code ${res.statusCode}`));
      }

      const body = [];
      res.on("data", (chunk) => body.push(chunk));
      res.on("end", () => {
        const resString = Buffer.concat(body).toString();
        resolve(resString);
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request time out"));
    });

    req.end();
  });
}

function toCustomISOString(date) {
  var pad = function (num) {
    return (num < 10 ? "0" : "") + num;
  };

  return (
    date.getFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    ":" +
    pad(date.getUTCMinutes())
  );
}

module.exports = {
  getPrices,
  getCo2Emis,
  getCo2EmisPrognosis,
};
