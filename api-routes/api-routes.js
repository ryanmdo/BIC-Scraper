//Setup the routing for api calls
var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');


var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');


//var d = new Date;
//Just for getting a timestamp



//setup mongoose and its model, connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/test');

var testPrice = require('../models/testPrice.model')


//define model







//Grabs prices and returns the span(original)
//Then it should put this into mongodb
function priceRequest(coinTag,res){
    console.log('Request theprices for '+coinTag+', and outputting them as spans')
    //array of spans to return
    var priceSpanArr = [];
    var pricesFinal = {};

    //Add timestamps
    


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
            pricesFinal['time_utc']=Date(Date.UTC()).toString();
            var d = new Date();
            pricesFinal['time_display']= (d.getDate()+1)+'-'+(d.getMonth()+1)+'-'+d.getFullYear()+' ['+d.getHours()+':'+d.getMinutes()+']';
            //Date(Date.getDate()+'-'+Date.getMonth()+'-'+Date.getFullYear());
            res.json(pricesFinal);
    })


    //For whatever reason this priceSpanArr is empty, the one above contains the data
    //console.log(priceSpanArr)
}





router.get('/getAllPrices',function(req,res){

    console.log('/getAllPrices is being gotten')


    var finalPrices = priceRequest('btc',res)
    console.log(finalPrices)
    
})

router.get('/mongoTest',function(request,response){
    mongoose.model('testPrices').find(function(err, results){
        response.send(results);
    })
})












module.exports = router;