const express = require('express');
const hbs = require('hbs');
const path = require('path');
const myRoutes = require('../routers/routers');
const app = express();

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))
app.set('views', path.join(__dirname, '../forntend/views'))
hbs.registerPartials( path.join(__dirname, '../forntend/layouts'))
app.use(myRoutes)




    
  

module.exports = app