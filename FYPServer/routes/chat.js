const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Comment = require('../models/comment');



//create a chat comment 
router.post('/', async (req, res) => {
    let requesterid = req.body.requesterid
    let target = req.body.comment
    // check if the email is duplicated
    let id = target._id
    let error = false
    let resp = {}

    let comment = null



    // generate a userid for the user
    comment = new Comment(target)
    try {
        resp.comment = await comment.save()
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
router.get('/', (req, res) => {

    Comment.find().exec().then(result => {
        res.json({ status: "success", comment: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })
})
module.exports = router