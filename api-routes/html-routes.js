var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/',function(request,response){
    //makes the html in home.html the displayed page.
    //should work.
    console.log('/ is being requested')


    response.render("home",{title:'homepage'});

    //response.sendFile(path.join(__dirname,'../public/index.html'))
})







module.exports = router;