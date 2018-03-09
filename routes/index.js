var express = require('express');
var router = express.Router();
var getDistanceFromLatLonInKm = require('../services/compute_distance');
var mongoose = require('mongoose');

const Contact = mongoose.model('contacts');

const DISTANCE_MINIMALE = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: "Homepage"})
});

router.post('/', function(req, res, next) {
  var userLocation = { longitude: req.body.longitude, latitude: req.body.latitude }
  console.log("Server called with location: ", userLocation)

  // var lieu1 = { longitude: 2.408435, latitude: 48.817861 };
  // var lieu2 = { longitude: 2.285465, latitude: 48.90461 };
  // var distance = getDistanceFromLatLonInKm(lieu1.latitude, lieu1.longitude, lieu2.latitude, lieu2.longitude);
  // console.log("la distance est ", distance);

  var newContacts = [];

  Contact.find({}, (error, contacts) => {
    contacts.map(contact => {
      var contactLocation = { longitude: contact.coords.longitude, latitude: contact.coords.latitude };
      var distance = getDistanceFromLatLonInKm(userLocation.latitude, userLocation.longitude, contactLocation.latitude, contactLocation.longitude);
      if(distance <= DISTANCE_MINIMALE){ newContacts.push(contact) };
      console.log("distance to contact is ", distance);
    });
    res.json(newContacts);
  });
});

router.post('/picture', function(req, res, next) {
  console.log("serveur : on va traiter un fichier");
  if (!req.files) {return res.status(400).send('No files were uploaded.')};
  console.log("serveur : on a un fichier");
  // let sampleFile = req.files.sampleFile;
  let photo = req.files.photo;
  photo.mv('./public/images/photo.jpg', function(err) {
    console.log("serveur : on déplace le fichier");
    if (err) {return res.status(500).send(err)};
    console.log("serveur : on déplace le fichier - pas d'erreur");
    res.send('serveur : File uploaded!');
  });
});

router.post('/audio', function(req, res, next) {
  console.log("serveur : on va traiter un audio");
  if (!req.files) {return res.status(400).send('No files were uploaded.')};
  console.log("serveur : on a un fichier audio");
  // let sampleFile = req.files.sampleFile;
  let photo = req.files.photo;
  photo.mv('./public/audio/record.m4a', function(err) {
    console.log("serveur : on déplace le fichier audio");
    if (err) {return res.status(500).send(err)};
    console.log("serveur : on déplace le fichier audi - pas d'erreur");
    res.send('serveur : Audio File uploaded!');
  });
});

module.exports = router;
