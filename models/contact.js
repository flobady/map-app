const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  firstName: String,
  lastName: String,
  coords: Object,
  status: String,
  avatar: String,
  creationDate: { type: Date, default: Date.now }
});

mongoose.model('contacts', contactSchema);

