const express = require('express')
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
var request = require("request");

const axiosUrl = {
  url: 'http://www.e2necc.com/EGGDailyAndMontlyPrices.aspx',
  method: 'get',
  responseType: 'html'
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');

let cityName = [];
let cityAllPrices = [];

let finalList = [];
let finalList1 = [];




app.get('/', async (req, res) => {
  await axios(axiosUrl)
    .then(async (resp) => {
      await getData(resp.data);
      // console.log('data', cityName, cityAllPrices, cityName.length, cityAllPrices.length);

      for (let i = 0; i < cityAllPrices.length; i++) {
        // console.log(cityName[i], cityAllPrices[i]);
        finalList += `${cityName[i]} - ${cityAllPrices[i]} \n`
      }
      console.log(finalList)
      finalList1 = JSON.stringify(finalList);

      var options = {
        method: 'POST',
        url: 'http://2factor.in/API/V1/2130a4c4-d110-11e8-a895-0200cd936042/ADDON_SERVICES/SEND/PSMS',
        "headers": {
          "content-type": "application/json",
        },
        body: `{ "From":"Praneet","Msg":${finalList1},"To":"9949969602,9901966270,8008887677"}`
      };

      await request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
      });

      res.send(finalList1)
    })

})

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
          if (i == dd ) {
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

app.listen(8000);