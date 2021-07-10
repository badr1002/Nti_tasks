const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const studentRouters = require('../routes/myRoutes.route');

app.use(express.json());
app.use(studentRouters);
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../forntend/views'));
hbs.registerPartials(path.join(__dirname, '../forntend/layouts'));

module.exports = app;
