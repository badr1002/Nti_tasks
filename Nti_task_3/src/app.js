const express = require('express');
const app = express();
const studentRouters = require('../routes/myRoutes.route');

app.use(express.json());
app.use(studentRouters);

module.exports = app;
