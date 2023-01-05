const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Bulletin = require('../models/bulletin')
router.post('/', async (req, res) => {

    let data = req.body.bulletin
    let error = false
    let resp = {}
    let bulletin = null
    let date = new Date();
    data.date = date
    bulletin = new Bulletin(data)
    try {
        resp.bulletin = await bulletin.save()

        error = true
        resp.message = "Bulletin cannot be added"
        resp.err = err
        console.log(err);
    } catch (error) {
        resp.status = "fail"
        res.json(resp)
        return
    }

    resp.status = "success"
    res.json(resp)
})
router.get('/', async (req, res) => {

    Bulletin.find().exec().then(result => {

        res.json({ status: "success", bulletin: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })
})
module.exports = router