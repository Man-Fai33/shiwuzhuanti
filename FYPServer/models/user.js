const mongoose = require('mongoose')
const Shop = require('../models/shop');

const User = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    /* 
    Possible values for role include the following:
    1. "Visitor"
    2. "User"
    3. "Manager"
    4. "Administrator"
    */
    password: { type: String },
    role: { type: String, required: true },
    phone: { type: String, required: true },
    introduction: { type: String, default:"" },
    location: String,
    gender: Boolean,
    date: Date,
    shop: { type: Array, default: [] },
    iconUrl: { type: String, default: "" }
});
module.exports = mongoose.model('User', User);