const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const routes = require('./src/Routes/route.js');
const db= require("./src/utils/database.js");
// const path = require('path');

const app = express();

app.use(cors());

const port = 3005;
app.use(bodyParser.json());
// Middleware
app.use(express.json());

app.use('/', routes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

  

