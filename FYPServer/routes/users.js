const { json } = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/user');



// Get all user records in the database
router.get('/user', (req, res) => {
  let requesterid = req.query.requesterid
  // verify the requester
  User.find().exec().then(result => {
    // result is an array of users
    res.json({ status: "success", users: result })
  })
    .catch(err => {
      res.json({ status: "fail", message: err })
    })
})


// Create a new user specified by a User object
router.post('/user', async (req, res) => {
  let requesterid = req.body.requesterid
  let target = req.body.user
  // check if the email is duplicated
  let email = target.email
  let error = false
  let resp = {}
  let user = null
  try {

    // find a user with a duplicated email
    user = await User.findOne({ email: email }).exec()
    if (user != null) {
      resp.message = "Email already existed"
      error = true
    }
  }
  catch (err) {
    // if the user cannot be found, do nothing
  }

  if (error) {
    resp.status = "fail"
    res.json(resp)
    return
  }

  // After checking the username is not duplicated


  // generate a userid for the user
  user = new User(target)
  try {
    resp.user = await user.save()
  }
  catch (err) {
    error = true
    resp.message = "User cannot be added"
    resp.err = err
    console.log(err);
  }

  if (error) {
    resp.status = "fail"
    res.json(resp)
    return
  }

  resp.status = "success"
  res.json(resp)
})


router.post('/user/emailPass', async (req, res) => {
  let requesterid = req.body.requesterid
  let targetEmail = req.body.email
  let targetPassword = req.body.password

  var user = null
  let userFound = false
  let resp = {}
  user = await User.findOne({
    email: targetEmail,
    password: targetPassword
  }).exec()

  if (user != null) {
    userFound = true
  }
  console.log(userFound)
  if (userFound) {
    resp.user = user
    resp.message = "User found"
    resp.status = "success"
    console.log(resp.user);
  }
  else {
    resp.message = "User not found"
    resp.status = "fail"
  }

  res.json(resp)
})


router.put('/user', async (req, res) => {


  let target = req.body.user
  let targetid = target._id
  let hasPermit = false;
  let appendBookmarkPlan = false;

 
  User.findByIdAndUpdate(targetid, target, { new: true }).exec().then(updatedUser => {
    res.json({ status: "success", user: updatedUser })
  })
 
})





module.exports = router;
