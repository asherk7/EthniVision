const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routeHandler = require('./handler');
const cors = require('cors');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('Connected to MongoDB'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', routeHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
