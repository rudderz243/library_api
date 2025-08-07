// we declare a new asyncronous method called "healthCheck", that returns 200 OK when called
const healthCheck = async (req, res) => {
    console.log("Everything is OK :)")
    // res.status() expects a http response code. in this case we use 200, which mean OK
    // .json then expects data that we will pass back to the calling browswer/application
    res.status(200).json({status: "OK"})
};

// by exporting out methods, we make them accessible in any other file that we call this file in
// think public, from c#/java
module.exports = {
    healthCheck
}