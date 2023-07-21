const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
