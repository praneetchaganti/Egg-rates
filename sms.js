const express = require('express')
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
var request = require("request");
// let city = ['Ahmedabad', 'Ajmer', 'Asansole','Barwala', 'Bengaluru (CC)', 'Bongaon','Brahmapur (OD)', 'Burdwan (CC)', 'Chennai (CC)','Chittoor', 'Delhi (CC)', 'E.Godavari','Hyderabad', 'Ludhiana', 'Midnapur (KOL)','Miraj', 'Mumbai (CC)', 'Muzaffurpur (CC)','Mysuru', 'Nagpur', 'Namakkal','Patna', 'Pune', 'Ranchi  (CC)','Vijayawada', 'Vizag', 'W.Godavari','Warangal', 'West godavari', 'Allahabad (CC)','Bhopal', 'Hospet', 'Indore (CC)','Jabalpur', 'Kanpur (CC)', 'Kolkata (CC)','Luknow (CC)', 'Raipur', 'Surat','Varanasi (CC)']
let city = JSON.stringify(`'Ahmedabad', 'Ajmer', 'Asansole','Barwala', 'Bengaluru (CC)', 'Bongaon','Brahmapur (OD)', 'Burdwan (CC)', 'Chennai (CC)','Chittoor', 'Delhi (CC)', 'E.Godavari','Hyderabad', 'Ludhiana', 'Midnapur (KOL)','Miraj', 'Mumbai (CC)', 'Muzaffurpur (CC)','Mysuru', 'Nagpur', 'Namakkal','Patna', 'Pune', 'Ranchi  (CC)','Vijayawada', 'Vizag', 'W.Godavari','Warangal', 'West godavari', 'Allahabad (CC)','Bhopal', 'Hospet', 'Indore (CC)','Jabalpur', 'Kanpur (CC)', 'Kolkata (CC)','Luknow (CC)', 'Raipur', 'Surat','Varanasi (CC)'`)

let cities = 'Raipur';
// console.log(JSON.stringify(cities))
// console.log(JSON.stringify(city))
// city=JSON.stringify(city)

var options = {
    method: 'POST',
    url: 'http://2factor.in/API/V1/2130a4c4-d110-11e8-a895-0200cd936042/ADDON_SERVICES/SEND/PSMS',
    "headers": {
        "content-type": "application/json",
    },
    body: `{ "From":"TFCTOR","Msg":${city},"To":"9949969602"}`


};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});

app.listen(6000);