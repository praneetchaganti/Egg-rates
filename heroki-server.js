const express = require('express')
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
var schedule = require('node-schedule');
var request = require("request");
let http = require('http');
let fs = require('fs');
const { hostname } = require('os');
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}
var port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

let handleRequest = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  fs.readFile('index.html', null, function (error, data) {
    if (error) {
      response.writeHead(404);
      response.write('Whoops! File not found!');
    } else {
      response.write(data);
    }
    response.end();
  });
};

const axiosUrl = {
  url: 'http://www.e2necc.com/EGGDailyAndMontlyPrices.aspx',
  method: 'get',
  responseType: 'html'
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');

let cityName = [];
let cityAllPrices = [];

var options = {
  method: 'POST',
  url: 'http://2factor.in/API/V1/96ab36da-f79d-11e8-a895-0200cd936042/ADDON_SERVICES/SEND/PSMS',
  "headers": {
    "content-type": "application/json",
  },
  body: `{ "From":"TFCTOR","Msg":"Hii","To":"9949969602"}`
};

// app.get('/url', (req, res) => {
  // res.send('entered into  api')
  // res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
  // console.log("hi")
  schedule.scheduleJob({ hour: 01, minute: 03 }, async function () {
    await axios(axiosUrl)
      .then(async (err, resp) => {
        await getData(resp.data);
        console.log('data', cityName, cityAllPrices, cityName.length, cityAllPrices.length);
        await request(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log(body);
        });
      })
      // res.send('entered into schedule api')
  })
// })

let getData = async (html) => {
  let $ = await cheerio.load(html);

  cityName = [];
  cityAllPrices = [];

  $('span.Label table tbody tr').each((j, ele) => {
    if (j > 1) {
      $(`span.Label table tr:nth-child(${j + 1}) td`).each(async (i, elem) => {
        if ($(elem).text()) {
          if (i == 0) {
            await cityName.push($(elem).text());
          }
          if (i == dd - 2) {
            let number = parseInt($(elem).text());
            await cityAllPrices.push(
              number
            );
          }

        }
      });
    }
  });

  var index = cityName.indexOf('Prevailing Prices');
  await cityName.splice(index, 1);

} //end of api

app.use(function (err, req, res, next) {

  console.log("Something went wrong:", err);
  res.render('error');
});



app.listen(port, hostname, () => {
  console.log(`Nodejs is Running http://${hostname}:${port}/`);
});