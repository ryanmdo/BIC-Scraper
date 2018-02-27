//Setup the routing for api calls
var express = require('express');
var path = require('path');
var moment = require('moment');
var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');



var router = express.Router();

//setup mongoose and its model, connection
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/test');
//var btcPrice =  require('../models/btcPrice.model')

//try monk
const db = require('monk')('localhost/test_btc_db');    
const btc_collection = db.get('btc_collection');



//Grabs prices and returns the span(original)
//Then it should put this into mongodb
function priceRequest(coinTag,res){
    console.log('Requesting the prices for '+coinTag+', and outputting them as spans')
    var priceSpanArr = [];
    var pricesFinal = {
        coinTag: coinTag
        
    };
    request('https://bitinfocharts.com',function(error,reponse,html){
            //preventDefault();
             var $ = cheerio.load(html)
             
             $('#t_price>.c_'+coinTag+'>span').each(function(i, element){
                 priceSpanArr.push($(element).text());
                 //console.log(d.getUTCMonth()+""+d.getUTCDate())
                 //console.log(priceSpanArr)
             })
             
             console.log(priceSpanArr)
             for (var i = 0;i<priceSpanArr.length;i++){
                 if(priceSpanArr[i].includes(':')){
                     //console.log('About to add "'+priceSpanArr[i]+'" to mongoose')
                     //split the strings into the name of the exchange, and the price. That is it.
                     var exchangeText = priceSpanArr[i].split(':')[0];
                     var usdPriceText = priceSpanArr[i].split(':')[1];
                     var indexOfUSD = usdPriceText.indexOf('USD');
                     usdPriceText = usdPriceText.slice(1,indexOfUSD-1).replace(/[^\d\.\-]/g, "");


                     //put into the pricesFinal array so that it is eventually pushed backed
                     var key = 'usd_btc_priceAt_'+exchangeText;
                     pricesFinal[key] = Number(usdPriceText)
                     //lifted from stackoverflow, a method of removing commas from numbers as strings                     //Below, manage to input the values into the mongoose test database.
                    }
             }
            //Add timestamps here
            pricesFinal['time_unix'] = Date.now();
            pricesFinal['time_utc'] = Date(Date.UTC()).toString();
            var d = new Date();
            pricesFinal['time_display'] = (d.getDate()+1)+'-'+(d.getMonth()+1)+'-'+d.getFullYear()+' ['+d.getHours()+':'+d.getMinutes()+']';
            //Date(Date.getDate()+'-'+Date.getMonth()+'-'+Date.getFullYear());
            res.json(pricesFinal);

            btc_collection.insert({
                coinTag: pricesFinal.coinTag,
                time_display: pricesFinal.time_display,
                time_unix: pricesFinal.time_unix,
                time_utc: pricesFinal.time_utc,
                usd_btc_priceAt_bitfinex: pricesFinal.usd_btc_priceAt_bitfinex,
                usd_btc_priceAt_bitstamp: pricesFinal.usd_btc_priceAt_bitstamp,
                usd_btc_priceAt_gdax: pricesFinal.usd_btc_priceAt_gdax,
                usd_btc_priceAt_gemini: pricesFinal.usd_btc_priceAt_gemini,
                usd_btc_priceAt_kraken: pricesFinal.usd_btc_priceAt_kraken,
                comments: ''
            })
    })

    

    //var btcPrice = mongoose.model('SHOULD NOT BE USED',btcPriceSchema);
    //var data = new btcPrice(pricesFinal)
    //data.time_unix = pricesFinal.time_unix;
    //data.save();
    //newBtcPrice.time_unix = pricesFinal.time_unix;
    //mongoose.model('testPrices',pricesFinal);    
    //For whatever reason this priceSpanArr is empty, the one above contains the data
    //console.log(priceSpanArr)
}





router.get('/getCompletePriceTable',function(req,res){

    console.log('/getCompletePriceTable is being gotten')

    //simply grab all of the collections and spit them back
    //no time for validation here
    btc_collection.find({}).then(function(response){
        //console.log(response)
        res.json(response)
    })

})





router.post('/updatePriceTable',function(req,res){
    console.log('/updatePriceTable is being requested')

    var finalPrices = priceRequest('btc',res)
    console.log(finalPrices)
    console.log()
})


// Forgot what I was doing here

// router.get('/mongoTest',function(request,response){
//     mongoose.model('testPrices').find(function(err, results){
//         response.send(results);
//     })
// })












module.exports = router;