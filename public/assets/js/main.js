//Ran into a strange error
//Below
// localhost/:75 GET http://localhost:3000/js/home.js net::ERR_ABORTED
// (index):75 GET http://localhost:3000/js/home.js net::ERR_ABORTED

//Moved all the javascript right into the handlebars file instead. It works that way


// window.onload = function(){

//     console.log('main.js has beenn successfully loaded')


//     $('h1').on('click',function(){

//         console.log('h1 has been clicked')
//     })


//     $('#update-all').on('click', function(){

//         console.log('This got clicked.')
//     })

// }