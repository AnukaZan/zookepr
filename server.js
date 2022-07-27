const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const fs = require('fs'); //to read and update animals.json file when we post

const path = require('path'); //module that provides utilities for working with file and directory paths

//connect the json file so front end can request data from the api we about to drop
const { animals } = require('./data/animals');

const express = require('express');

const PORT = process.env.PORT || 3001; //use environment variable called process.env.PORT or default to port 3001

const app = express(); //instatiate server 

//parse incoming string or array data
app.use(express.urlencoded({ extended: true}));

//parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoutes); //if /api, use apiRoutes
app.use('/', htmlRoutes); //if / then HTML routes


app.listen(PORT, () => { //host server on port 3001
    console.log(`API server now on port ${PORT}!`);
});

