const express = require('express');
const CORS = require('cors');
const app  = express();
const path = require('path');

// 1.) Client sends a /GET to /home:
  // a.) Proxy server sends back an html file;
// 2.) Client sends a /GET for an app.js file that includes all 4 service's own apps inside it:
  // a.) Proxy server sends back an app.js file that fits those specifications;
// 3.) Client sends a /GET for .json data:
  // a.) Proxy server sends out /GET to each individual service's API;
  // b.) Each individual service queries the database;
  // c.) The database responds to each service;
  // d.) Each service's API sends back a response to the proxy server's API;
  // e.) The proxy server's API responds to the client; 
  // f.) The client generates a new html;

app.use(CORS());
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/dist/index.html'))
})

// Eugenia's module: (3000)
app.get('/restaurants/:id/photos', (req, res) => {
  // extract the id with request.params.id
  var id = req.params.id
  res.redirect(`http://localhost:3000/api/restaurants/${id}/photos`);
});

// My module: (port 3001)
app.get('/restaurants/:id/reviews', (req, res) => {
  var id = req.params.id
  req.redirect(`http://localhost:3001/api/restaurants/${id}/reviews`);
});

// Rafe's module: (port 3002)
app.get('/restaurants/:id/info/', (req, res) => {
  var id = req.params.id
  req.redirect(`http://localhost:3002/api/restaurants/${id}/info`);
});

// Erik's module: (port 3003)
app.get('/:id/googlereviews/', (req, res) => {
  req.redirect('/api/restaurants/:id/googlereviews');
});

app.listen(4000, () => console.log('Listening on port 4000!'));
