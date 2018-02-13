//Setup the routing for api calls
var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');


var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
//require any other data here





//Grabs prices and returns the span(original)
//Then it should put this into mongodb
function priceRequest(coinTag){
    console.log('Request theprices for '+coinTag+', and outputting them as spans')
    //array of spans to retun
    var priceBodyArr = [];
    var prices;



    request('https://bitinfocharts.com',function(error,reponse,html){
            //preventDefault();
             var $ = cheerio.load(html)

             $('#t_price>.c_'+coinTag+'>span').each(function(i, element){
                 priceBodyArr.push($(element).text());
                //  moment.locale()
                //  moment.format('LTS')
                 console.log(priceBodyArr)
             })
            
             //console.log(priceBodyArr)
    })


    //For whatever reason this priceBodyArr is empty, the one above contains the data
    //console.log(priceBodyArr)
    return priceBodyArr;
}



router.get('/xmrRequest',function(req,res){

    //router.get('/xmrrequest')
    console.log('/xmrRequest is being gotten')



    var xmrPriceArr = priceRequest('dash')
    res.json(xmrPriceArr)
    console.log(xmrPriceArr)

})

//This should put the data onto the page.
router.put('/printPrices',function(request,response){



})











module.exports = router;