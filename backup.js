const express = require('express')
const request = require('request');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

const url = 'http://www.e2necc.com/EGGDailyAndMontlyPrices.aspx';

const axiosUrl = {
  url: 'http://www.e2necc.com/EGGDailyAndMontlyPrices.aspx',
  method: 'get',
  responseType: 'html'
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
console.log(dd)

let cityName = [];
let cityAllPrices = [];

app.get('/', async function (req, res) {
 await axios(axiosUrl)
    .then( async function (resp) {
      await getData(resp.data);
      console.log('data', cityName, cityAllPrices, cityName.length, cityAllPrices.length);

      // res.send(returnResp)
    })
})




let getData = async(html) => {
  console.log("hiii")
  data = [];
  let $ = await cheerio.load(html);

  // const $ = cheerio.load(html);
  // $('body').each((i, elem) => {
  //   data.push({
  //     title : $(elem).text(),
  //     link : $(elem).find('a.storylink').attr('href')
  //   });
  // });
  // console.log(data);


  // let getData = html => {
  //   data = [];
  //   const $ = cheerio.load(html);
  //   $('table.itemlist tr td:nth-child(3)').each((i, elem) => {
  //     data.push({
  //       title : $(elem).text(),
  //       link : $(elem).find('a.storylink').attr('href')
  //     });
  //   });
  //   console.log(data);
  // }

  // let cityName;
  // $('span.Label table tr:nth-child(15) td').each((i, elem) => {

  //   if ($(elem).text()) {
  //     if (i == 0) {
  //       cityName = $(elem).text()
  //     }
  //     let number = parseInt($(elem).text());
  //     if (number > 0) {
  //       console.log(number)
  //       data.push(
  //         number
  //       );
  //     }
  //   }

  // });
  // console.log('data', cityName, data[data.length - 2]);


  cityName = [];
  cityAllPrices = [];
  let finalData = [];

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

  // const newArr = cityName.filter(e => e !== 'Prevailing Prices')

  var index = cityName.indexOf('Prevailing Prices');
  await cityName.splice(index, 1);

  // console.log('data', cityName, cityAllPrices, cityName.length, cityAllPrices.length);

} //end of api



// let timerId = setInterval(() => console.log('tick'), 2000);
// let timerId = setTimeout(function tick() {
//   console.log('tick');
//   timerId = setTimeout(tick, 2000); // (*)
// }, 2000);


app.listen(6000);