const mongoose = require('mongoose')
const Image = new mongoose.Schema({
   owner: String,
   Image: String
})
// Food.add({ food: [Food] })
module.exports = mongoose.model('Image', Image)