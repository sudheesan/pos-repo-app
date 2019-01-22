const express = require('express');
const bodyParser = require('body-parser');
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const cors = require('cors')

// create express app
const app = express();

//enabling cross origin resource sharing
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('./app/routes/order.route.js')(app);
require('./app/routes/item.route.js')(app);

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to POS application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests
app.listen(3030, () => {
    console.log("Server is listening on port 3000");
});