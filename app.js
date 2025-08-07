// calling in express to be used throughout the application
const express = require('express');

// call in our router
const testRoutes = require('./routes/testRoutes.js');

// setting up express using the default parameters
const app = express();

// calling in express.json middleware, so that our app can handle json
app.use(express.json());

// log every request
// the logger will look at the request, generate a response, then handle the next incoming request
app.use((req, res, next) => {
    // print out to the console (terminal) what type of method was used and to what endpoint that request was made
    console.log(`${req.method} ${req.url}`)
    // prepare to handle the next incoming request
    next();
});

// first we version our api (v1) so that breaking changes can live on a new version
// then we specify an area that we want the routes to live in (in this case /test)
// finally, we point the app to where our routes live.
app.use('/v1/test', testRoutes);

// tell the API to start listening on a port we provide (which will eventually move to a .env file)
app.listen(3000, () => {
    console.log(`The API is now listening on port 3000.`)
});