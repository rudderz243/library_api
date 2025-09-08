// creating an instance of mongoose
const mongoose = require('mongoose');
// calling in .env so we can get our connection string from the .env file
require('dotenv').config()

// unlike in the controller, req and res is not needed here as they are not going
// to be received as parameters. this method is parameterless
const connectToMongo = async () => {
    try {
        // creating a new connection to the mongo db we will be using
        await mongoose.connect(process.env.CONN_STRING, {
            // because we are using mongo atlas (online), these options are required
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to the database successfully.")
    } catch (err) {
        // if unable to connect to the database, log out an error message and kill the app.
        console.error("Unable to connect to the mongo database.")
        process.exit(1);
    }
}

module.exports = {connectToMongo}
