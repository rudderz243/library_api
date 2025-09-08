// cors - configuration options for an express API
// csurf - how it helps for CSRF attacks, and how to configure it for a node.js API
// helmet - how it helps when it comes to header protections and clickjacking
// rate limiting, brute force prevention, and what libraries can be used to implement this for a node.js API

const helmet = require('helmet');
const cors = require('cors');

const corsOptions = {
    // origin allows us to set where we will permit requests from (for now *, which allows everywhere and everyone!)
    origin: '*',
    // controlling what types of HTTP requests we will permit
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allow the flow of credentials between our backend API and out frontend web portal
    credentials: true,
};


const securityMiddlewares = (app) => {
    app.use(helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                // allow scripts from the website itself, but from nowhere else
                'default-src': ["'self'"],
                // prevent our website from being embedded on another website
                'frame-ancestors': ["'none'"],
            }
        },
        featurePolicy: {
            features: {
                // block any access to any location APIs, be it the built in Windows ones, or mobile oriented ones
                geolocation: ["'none'"],
                microphone: ["'none'"],
            }
        },
        // stop our API from telling people that it is an Express API (making it harder for people to tell what it is, to look up vulnerabilities)
        hidePoweredBy: true,
        // prevent our website from being put into an iframe
        frameguard: {
            action: 'deny'
        },
        // prevent IE users
        ieNoOpen: true,
    }));

    app.use(cors(corsOptions));
};

module.exports = { securityMiddlewares }