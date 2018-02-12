// Dependencies
var express = require('express');
var mongojs = require('mongojs');
var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars')
var path = require('path')
var exphbs = require('express-handlebars')




var app = express();
//Use the handlebars engine
app.engine('handlebars',exphbs({
    defaultLayout: 'main'
}))
app.set('views', path.join(__dirname,'views'));
app.set('view engine','handlebars')




//Linking the routes in api-routes
var apiRoutes = require('./api-routes/api-routes.js');
var htmlRoutes = require('./api-routes/html-routes.js');
app.use('/api',apiRoutes);
app.use(htmlRoutes);


//This should be the name f the mongo database
var databaseURL = 'bic_db';

//And this should the only 'table' for the db
var collections = ['bic_prices'];


var db = mongojs(databaseURL, collections);



//Request the page to grab its html
//MOVED TO API-ROUTES in /api-routes
//DELETED



//Turn this damn thing on.
app.listen(3000, function(){
    console.log('bic-scraping is online on port 3000.');
})