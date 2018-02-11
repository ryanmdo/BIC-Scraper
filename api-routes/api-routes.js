//Setup the routing for api calls

var express = require('express');
var router = express.Router();
var path = require('path');


var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');

//require any other data here




router.get('/priceRequestFor',function(req,res){


    function priceGrab(coinTag){
        console.log('Request theprices for '+coinTag+', and outputting them as spans')

        request('https://bitinfocharts.com',function(error,reponse,html){

                 var $ = cheerio.load(html)
                 

                 var priceBody;
 
                 $('#t_price>.c_'+coinTag+'>span').each(function(i, element){
                     priceBody += $(element).text() +'\n';
                 })

                //hard-coded for the five currencies I want to trmodule.exports = router;ack-btc,ltc,dash,xmr,eth
                $('#t_price>.c_xmr>span').each(function(i, element){
                    priceBody += $(element).text() +'\n';
                    
                })

                console.log(priceBody)

        })
    }

    priceGrab('xmr');





})







module.exports = router;