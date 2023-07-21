const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4000;
const routeHandler = require('./routes/handler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routeHandler);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
