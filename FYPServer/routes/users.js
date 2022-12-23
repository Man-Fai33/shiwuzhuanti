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
  let isCreate = true
  console.log(target)

  if (target.login != undefined || target.login == true) {

    isCreate = false
    console.log("this is login part")
  }



  if (isCreate) {
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
  } else {

    let targetEmail = email
    let targetPassword = target.password
    console.log(targetEmail + targetPassword)


    let userFound = false
    let resp = {}
    user = await User.findOne({
      email: email,
      password: targetPassword
    }).exec()
    if (user != null) {
      userFound = true
    }
    console.log(userFound)
    if (userFound) {
      // Solve user binary references
      // resp.references = await solveUserBinaryReferences(user)
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

  }


})


// router.post('/user/emailPass', async (req, res) => {
//   let requesterid = req.body.requesterid
//   let targetEmail = req.body.email
//   let targetPassword = req.body.password

//   var user = null
//   let userFound = false
//   let resp = {}
//   user = await User.findOne({
//     email: targetEmail,
//     password: targetPassword
//   }).exec()
//   if (user != null) {
//     userFound = true
//   }
//   console.log(userFound)
//   if (userFound) {
//     // Solve user binary references
//     resp.references = await solveUserBinaryReferences(user)
//     resp.user = user
//     resp.message = "User found"
//     resp.status = "success"
//     console.log(resp.user);
//   }
//   else {
//     resp.message = "User not found"
//     resp.status = "fail"
//   }

//   res.json(resp)
// })

// Get target user record specified by userid
router.get('/user/check/:id', async (req, res) => {
  let requesterid = req.query.requesterid
  let targetid = req.params.id
  let user = null

  let userFound = false
  let resp = {}

  // Check if the user exist
  user = await Helper.isUserExist(targetid)
  if (user == null) {
    resp.status = "fail"
    resp.message = "User not found"
    res.json(resp)
    return
  }

  // Assign the user back to the HTTP response
  resp.user = user
  resp.message = "User found"
  resp.status = "success"
  // console.log(resp.user)

  res.json(resp)
})



router.put('/user', (req, res) => {
  let requesterid = req.body.requesterid
  let target = req.body.user
  console.log(req.body.user)
})
















module.exports = router;
