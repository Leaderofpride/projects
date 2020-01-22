const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const userRoutes = require('./api/routes/user');
const companyRoutes = require('./api/routes/company');
const skillRoutes = require('./api/routes/skill');
const reviewRoutes = require('./api/routes/review');
const giftRoutes = require('./api/routes/gift');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});

require("./api/database/links")();

app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/skill', skillRoutes);
app.use('/review', reviewRoutes);
app.use('/gift', giftRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;