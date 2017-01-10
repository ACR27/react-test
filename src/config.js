var PROD_SOCKET_URL = 'http://live-api.numberfire.com';
var DEV_SOCKET_URL = 'http://live-dev-api.numberfire.com';
var PROD_URL = 'http://nf-api.numberfire.com';
var DEV_URL = 'http://nf-api-dev.numberfire.com';
var LOCAL_SOCKET_URL = 'http://localhost:4002';
var LOCAL_URL = 'http://localhost:4001';

var API_URL = PROD_URL;
var SOCKET_URL = LOCAL_SOCKET_URL;

if(process.env.LIVE_DB === "DEV") {
    API_URL = DEV_URL;
    SOCKET_URL = DEV_SOCKET_URL;
} else if(process.env.LIVE_DB === "PROD") {
    API_URL = PROD_URL;
    SOCKET_URL = PROD_SOCKET_URL;
}

module.exports = {
    API_URL: API_URL,
    SOCKET_URL: SOCKET_URL
}