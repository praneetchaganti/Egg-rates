const express = require('express')
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

const axiosUrl = {
  url: 'http://www.e2necc.com/EGGDailyAndMontlyPrices.aspx',
  method: 'get',
  responseType: 'html'
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');

let cityName = [];
let cityAllPrices = [];

app.get('/', async (req, res) => {
  await axios(axiosUrl)
    .then(async (resp) => {
      await getData(resp.data);
      console.log('data', cityName, cityAllPrices, cityName.length, cityAllPrices.length);
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
          if (i == dd - 1) {
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

app.listen(6000);