const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Market = require('../models/market');



router.post('/', async (req, res) => {

    let data = req.body.market

    let marketName = data.name
    let error = false
    let resp = {}
    let market = null
    try {
        market = await Market.findOne({ name: marketName }).exec()
        if (market != null) {
            resp.message = "Email already existed"
            error = true
        }
    } catch (error) {

        if (error) {
            resp.status = "fail"
            res.json(resp)
            return
        }
    }

    market = new Market(data)
    try {

        resp.market = await market.save()
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

    Market.find().exec().then(result => {
        res.json({ status: "success", market: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })
})
router.post('/:id', (req, res) => {
    let targetid = req.params.id
    Market.findById(targetid).exec().then(result => {

        res.json({ status: "success", market: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })
})





module.exports = router;

