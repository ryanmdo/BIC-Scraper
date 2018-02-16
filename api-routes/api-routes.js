//Setup the routing for api calls
var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');


var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');


var d = new Date;



//setup mongoose and its model, connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/test');

var testPrice = require('../models/testPrice.model')


//define model
mongoose.model('testPrices',{
    timedate:String,
    bitstamp_priceof_btc:Number,
    bitfenix_priceof_btc:Number,
    kraken_priceof_btc:Number,
    hitbtc_priceof_btc:Number,
    gemini_priceof_btc:Number
});







//Grabs prices and returns the span(original)
//Then it should put this into mongodb
function priceRequest(coinTag,res){
    console.log('Request theprices for '+coinTag+', and outputting them as spans')
    //array of spans to retun
    var prices;
    var priceBodyArr = [];
    var priceArr = [];



    request('https://bitinfocharts.com',function(error,reponse,html){
            //preventDefault();
             var $ = cheerio.load(html)
             
             $('#t_price>.c_'+coinTag+'>span').each(function(i, element){
                 priceBodyArr.push($(element).text());
                 //console.log(d.getUTCMonth()+""+d.getUTCDate())
                 //console.log(priceBodyArr)
             })
             
             console.log(priceBodyArr)
             for (var i = 0;i<priceBodyArr.length;i++){
                 if(priceBodyArr[i].includes(':')){
                     console.log('About to add "'+priceBodyArr[i]+'" to mongoose')
                     //Split the strings into the name of the exchange, and the price. That is it.
                     var usdSpan = priceBodyArr[i].split(':')[1]
                     var indexOfUSD = usdSpan.indexOf('USD')
                     //lifted from stackoverflow, a method of removing commas from numbers as strings
                     console.log(usdSpan.slice(1,indexOfUSD-1).replace(/[^\d\.\-]/g, ""));
                     //Below, manage to input the values into the mongoose test database.
                    }
             }
             res.json(priceBodyArr);
            
             //console.log(priceBodyArr)
    })


    //For whatever reason this priceBodyArr is empty, the one above contains the data
    //console.log(priceBodyArr)
}





router.get('/getAllPrices',function(req,res){

    console.log('/getAllPrices is being gotten')


    var xmrPriceArr = priceRequest('btc',res)
    console.log(xmrPriceArr)
    
})

router.get('/mongoTest',function(request,response){
    mongoose.model('testPrices').find(function(err, results){
        response.send(results);
    })
})












module.exports = router;