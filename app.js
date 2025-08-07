// calling in express to be used throughout the application
const express = require('express');

// setting up express using the default parameters
const app = express();

// log every request
app.use((req, res, next) => {
    // print out to the console (terminal) what type of method was used and to what endpoint that request was made
    console.log(`${req.method} ${req.url}`)
    // prepare to handle the next incoming request
    next();
})

// tell the API to start listening on a port we provide (which will eventually move to a .env file)
app.listen(3000, () => {
    console.log(`The API is now listening on port 3000.`)
})