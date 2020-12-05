const express = require('express')
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
var request = require("request");
const TwoFactor = new (require('2factor'))('2130a4c4-d110-11e8-a895-0200cd936042');


let city = ['Ahmedabad', 'Ajmer', 'Asansole',
'Barwala', 'Bengaluru (CC)', 'Bongaon',
'Brahmapur (OD)', 'Burdwan (CC)', 'Chennai (CC)',
'Chittoor', 'Delhi (CC)', 'E.Godavari',
'Hyderabad', 'Ludhiana', 'Midnapur (KOL)',
'Miraj', 'Mumbai (CC)', 'Muzaffurpur (CC)',
'Mysuru', 'Nagpur', 'Namakkal',
'Patna', 'Pune', 'Ranchi  (CC)',
'Vijayawada', 'Vizag', 'W.Godavari',
'Warangal', 'West godavari', 'Allahabad (CC)',
'Bhopal', 'Hospet', 'Indore (CC)',
'Jabalpur', 'Kanpur (CC)', 'Kolkata (CC)',
'Luknow (CC)', 'Raipur', 'Surat',
'Varanasi (CC)']

TwoFactor.sendTransactional(["9949969602","8121179869"], "Your message", "8494995774")
    .then((response) => {
      console.log(response)
    }, (error) => {
      console.log(error)
    })





app.listen(6000);