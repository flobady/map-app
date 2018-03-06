var express = require('express');
var router = express.Router();


const contact = [
  {id: 1 , firstName: "Pierre"  , lastName:"Coquillou", coords: { longitude: 2.408435, latitude: 48.817861 }, status: "Walking", avatar: "http://localhost:3000/images/avatar1.png"},
  {id: 2 , firstName: "Paul"    , lastName:"Huili"    , coords: { longitude: 2.33, latitude: 48.857861 }, status: "Walking"    , avatar: "http://localhost:3000/images/avatar2.png"},
  {id: 3 , firstName: "Jacques" , lastName:"Chabau"   , coords: { longitude: 2.331, latitude: 48.86 }, status: "Walking"       , avatar: "http://localhost:3000/images/avatar3.png"},
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(contact);
});

module.exports = router;
