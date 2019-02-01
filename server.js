const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors')

// create express app
const app = express();

//enabling cross origin resource sharing
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-typloginloginlogine - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

require('./app/routes/order.route.js')(app);
require('./app/routes/item.route.js')(app);
require('./app/routes/login.route.js')(app);


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to POS application."});
});


module.exports = app;