// Dependencies
var express = require('express');
var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');





var app = express();


var apiRoutes = require('./api-routes/api-routes.js');
var htmlRoutes = require('./api-routes/html-routes.js');

app.use(apiRoutes);
app.use(htmlRoutes);
//app.use('/',htmlRoutes);


//This should be the name f the mongo database
var databaseURL = 'bic_db';

//And this should the only 'table' for the db
var collections = ['bic_prices'];


var db = mongojs(databaseURL, collections);



//Request the page to grab its html
//MOVED TO API-ROUTES in /api-routes
//
//
// request('http://bitinfocharts.com',function(err,res,html){
//     var $ = cheerio.load(html)

//     var a;
//     // should be 
//     var coinTag;


//     $('#t_price>.c_'+coinTag+'>span').each(function(i, element){
//         a += $(element).text() +'\n';
//     })

//     //hard-coded for the five currencies I want to track-btc,ltc,dash,xmr,eth
//     $('#t_price>.c_xmr>span').each(function(i, element){
//         a += $(element).text() +'\n';
//     })




    //console.log(a)




    //Failed attempts at trying to extract the prices fom the html 


    // var d = $('#t_price').children().text();
    // console.log(d)
    // $('#t_price').each(function(i, element){


    //     console.log($(element).hasClass('.c_xmr'))
    //     console.log($(this).text())
    //     if($(this).hasClass('c_xmr')){
    //         console.log($(this).text)
    //     }
    // })
//  


//setup the homepage get
// app.get('/',function(req,res){
//     res.sendFile(__dirname + '/public/index.html');
// })




//Turn this damn thing on.
app.listen(3000, function(){
    console.log('bic-scraping is online on port 3000.');
})