// including express
const express = require('express');
const app = express();
// setting up the port
const port = 8000;

// using express router
app.use('/', require('./routes'));

// setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// setup app.listen for checking if server is running without any error
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server in running on port: ${port}`);
});