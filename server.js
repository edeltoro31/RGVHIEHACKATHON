const express = require('express');
const path = require('path');
var hbs = require( 'express-handlebars');
const session = require('express-session');

app = express()

app.set('port', 3002)

app.use(express.static(path.join(__dirname, 'static')))

app.set('view engine', 'html');
app.engine( 'html', hbs( {
  extname: 'html',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.get('/patient_portal', (req, res) => {
    res.render("patient_portal.html")
})

app.get('/patient_login', (req, res) => {
  res.render('patient_login.html')
})

app.get('/patient_search', (req, res) => {
  res.render("patient_search.html")
})

app.get('/patient_page', (req, res) => {
  res.render("patient_page.html")
})

app.get('/pharmacy_page', (req, res) => {
  res.render("pharmacy_page.html")
})

app.get('/physician_page', (req, res) => {
  res.render("physician_page.html")
})

app.get('/ems_page', (req, res) => {
  res.render("ems_page.html")
})

var server = app.listen(app.get('port'), function() {
	console.log("Server started...")
})
