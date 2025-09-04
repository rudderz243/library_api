// calling in all required imports
const express = require('express');
require('dotenv').config();
const { connectToMongo } = require('./services/dbService.js');
const { securityMiddlewares } = require('./middlewares/securityMiddleware.js');

// call in our router
const testRoutes = require('./routes/testRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');

// setting up express using the default parameters
const app = express();

// calling in express.json middleware, so that our app can handle json
app.use(express.json());

// set up our security middleware
securityMiddlewares(app);

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
app.use('/v1/books', bookRoutes);

const port = process.env.API_PORT || 3000

// call the method from our dbService file to connect to our Mongo database
connectToMongo();

// tell the API to start listening on a port we provide (which will eventually move to a .env file)
app.listen(port, () => {
    console.log(`The API is now listening on port ${port}.`)
});