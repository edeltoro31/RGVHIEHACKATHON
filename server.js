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

var server = app.listen(app.get('port'), function() {
	console.log("Server started...")
})
