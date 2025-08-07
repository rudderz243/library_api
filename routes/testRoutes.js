const express = require('express')
// calling in our testController so that we can use its methods
const testController = require('../controllers/testController.js')

// set up the singleton for the router
const router = express.Router();

// here we first specify the type (.get for get request), we then specify what URL it lives at
// and finally, we tell it which method in the controller will handle the logic
router.get('/healthCheck', testController.healthCheck)

// exporting our router (map), so that we can call it in the main program (app.js)
module.exports = router
