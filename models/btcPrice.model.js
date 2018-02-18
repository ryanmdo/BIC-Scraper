var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var btcPriceSchema = new Schema({
    time_display: String,
    time_unix: Number,
    time_utc: String,
    usd_btc_priceAt_bitfinex: Number,
    usd_btc_priceAt_bitstamp: Number,
    usd_btc_priceAt_gemini: Number,
    usd_btc_priceAt_hitbtc: Number,
    usd_btc_priceAt_kraken: Number
},{
    collection:'testPrices'
})


//so this is just the schema, which is different from the model.
//the model should be made inside of the api-routes
module.exports = mongoose.model('textPrices',btcPriceSchema);