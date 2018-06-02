const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: './public/uploads' });
const mongoose = require('mongoose');
const morgan = require('morgan');
const routes = require('./routes/routes');
const keys = require('./config/keys');

mongoose.connect(keys.mongoDB.dbURI)
    .then(() => {
        console.log(`database is connected to mLAB`);
    })
    .catch(err => {
        console.log(`hard to connect to databse due to `+err);
    });

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use('/', routes);

module.exports = app;