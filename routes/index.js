var express = require('express');
var router = express.Router();
var getDistanceFromLatLonInKm = require('../services/compute_distance');

const DISTANCE_MINIMALE = 10;

const contacts = [
  {id: 1 , firstName: "Pierre"  , lastName:"Coquillou", coords: { longitude: 2.408435, latitude: 48.817861 }, status: "Walking", avatar: "http://localhost:3000/images/avatar1.png"},
  {id: 2 , firstName: "Paul"    , lastName:"Huili"    , coords: { longitude: 2.33, latitude: 48.857861 }, status: "Walking"    , avatar: "http://localhost:3000/images/avatar2.png"},
  {id: 3 , firstName: "Jacques" , lastName:"Chabau"   , coords: { longitude: 2.331, latitude: 48.86 }, status: "Walking"       , avatar: "http://localhost:3000/images/avatar3.png"},
];
/* GET home page. */
router.post('/', function(req, res, next) {
  var userLocation = { longitude: req.body.longitude, latitude: req.body.latitude }
  console.log("Server called with location: ", userLocation)

  var lieu1 = { longitude: 2.408435, latitude: 48.817861 };
  var lieu2 = { longitude: 2.285465, latitude: 48.90461 };
  var distance = getDistanceFromLatLonInKm(lieu1.latitude, lieu1.longitude, lieu2.latitude, lieu2.longitude);
  console.log("la distance est ", distance);

  var newContacts = [];
  contacts.map(contact => {
    var contactLocation = { longitude: contact.coords.longitude, latitude: contact.coords.latitude };
    var distance = getDistanceFromLatLonInKm(userLocation.latitude, userLocation.longitude, contactLocation.latitude, contactLocation.longitude);
    if(distance <= DISTANCE_MINIMALE){ newContacts.push(contact) };

    console.log("distance to contact is ", distance);
  });

  res.json(newContacts);
});

module.exports = router;
