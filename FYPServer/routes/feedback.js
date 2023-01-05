const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const FeedBack = require('../models/feedback');
router.post('/', async (req, res) => {

    let data = req.body.feedback
    let error = false
    let resp = {}
    let feedback = null
    let date = new Date();

    data.date = date
    feedback = new FeedBack(data)
    feedback.id=feedback._id
    console.log(feedback)
    try {

        resp.feedback = await feedback.save()
    }
    catch (err) {
        error = true
        resp.message = "FeedBack cannot be added"
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
router.get('/', async (req, res) => {

    FeedBack.find().exec().then(result => {

        res.json({ status: "success", feedback: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })
})
module.exports = router