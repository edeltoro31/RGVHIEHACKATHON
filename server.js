
const express = require('express');
const path = require('path');
const headers = require('headers')
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
  res.render("patient_login.html")
})

app.get('/patient_search', (req, res) => {
  res.render("patient_search.html")
})


app.get('/patient_page/:name', (req, res) => {

        res.redirect("/patient_page/"+req.params.name+"/"+"4906a4bb-b713-4f05-8d93-1f4d0fe8c1e4");

})

app.get('/patient_page/:name/:id', (req, res) => {
  var request = require('request'),
  username = "postman",
  password = "secret",
  url = "https://rgvhackathon.aidbox.app/fhir/Patient?name="+ req.params.name,
  url2 = "https://rgvhackathon.aidbox.app/fhir/MedicationRequest?identifier?"+req.params.id,
  auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
  var name, birth, address, state, country, gender, phone, last

  request(
    {
        url : url,
        headers : {
            "Authorization" : auth
        }
    },
    function (error, response, body) {
        
          name = JSON.parse(body).entry[0].resource.name[0].given + ' ' + JSON.parse(body).entry[0].resource.name[0].family,
          birth = JSON.parse(body).entry[0].resource.birthDate,
          address = JSON.parse(body).entry[0].resource.address[0].line,
          state = JSON.parse(body).entry[0].resource.address[0].state,
          country = JSON.parse(body).entry[0].resource.address[0].country,
          gender = JSON.parse(body).entry[0].resource.gender,
          phone = JSON.parse(body).entry[0].resource.telecom[0].value,
          last = JSON.parse(body).entry[0].resource.meta.lastUpdated

          request(
            {
              url : url2,
              headers: {
                "Authorization" : auth
              }
            },
            function (error, response, body2) {
              console.log();
              data = JSON.parse(body2);
              data.entry.sort((a, b) => b.resource.authoredOn.localeCompare(a.resource.authoredOn));
              res.render("patient_page.html", {
                medication: data.entry,
                name: name,
                birth: birth,
                address: address,
                state: state,
                country: country,
                gender: gender,
                phone: phone,
                last: last
              })
        
            }
          )
       
    }
  )
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