//Setup the routing for api calls

var express = require('express');
var router = express.Router();
var path = require('path');


var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');

//require any other data here


function priceRequest(coinTag){
    console.log('Request theprices for '+coinTag+', and outputting them as spans')

    request('https://bitinfocharts.com',function(error,reponse,html){

             var $ = cheerio.load(html)
             var priceBodyArr = [];

             //Grabs the span which contains the 5 prices, and puts onto priceBodyArr
             $('#t_price>.c_'+coinTag+'>span').each(function(i, element){
                 priceBodyArr += $(element).text() +'\n';
             })
            
             console.log(priceBodyArr)
             return priceBodyArr;

            

    })
}


router.get('/xmrRequest',function(req,res){


    priceRequest('xmr');

})










module.exports = router;