var mongoose = require('mongoose');

var testPrice = new mongoose.Schema({
    timedate:String,
    bitstamp_priceof_btc:Number,
    bitfenix_priceof_btc:Number,
    kraken_priceof_btc:Number,
    hitbtc_priceof_btc:Number,
    gemini_priceof_btc:Number
})

module.exports = mongoose.model('price_btc',testPrice);