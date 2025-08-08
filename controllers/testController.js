// we declare a new asyncronous method called "healthCheck", that returns 200 OK when called
const healthCheck = async (req, res) => {
    console.log("Everything is OK :)");
    // res.status() expects a http response code. in this case we use 200, which mean OK
    // .json then expects data that we will pass back to the calling browswer/application
    res.status(200).json({status: "OK"});
};

const greeter = async (req, res) => {
    // we are going to get input from the response body!
    // make sure to call req.body, as that is where the data lies
    // the api is also expecting the body to be in json format
    const userName = req.body.userName

    // check if null
    if (!userName) {
        console.log("Please enter something valid");
        // return an error if the user did not enter anything into the request body
        res.status(418).json({error: "Invalid or missing input"});
    }
    // if all is good, greet the user
    res.status(200).json({greeting: `Hello, ${userName}!`});
};


// by exporting out methods, we make them accessible in any other file that we call this file in
// think public, from c#/java
module.exports = {
    healthCheck,
    greeter
}