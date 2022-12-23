const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Shop = require('../models/shop');

//get all shop 
router.get('/shop', (req, res) => {
    let requesterid = req.query.requesterid

    Shop.find().exec().then(result => {
        res.json({ status: "success", users: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })
})
//get singe shop by id
router.get('/shop/:id', (req, res) => {
    let shopid = req.params.id
    let shopFound = false
    let resp = {}
    let shop = Shop.findById({ _id: shopid }).exec()
    if (shop != null) {
        shopFound = true
    }
    if (shopFound) {
        resp.shop = shop
        resp.message = "Shop found"
        resp.status = "success"
        console.log(resp.shop);
    } else {
        resp.message = "Shop not found"
        resp.status = "fail"
    }
    res.json(resp)
})

// create the new shop 
router.post('/shop', async (req, res) => {
    let requesterid = req.body.requesterid
    let data = req.body.food
    let error = false
    let resp = {}
    let shop = null
    let isCreate = true

    // if (data.isCreate != undefined || data.isCreate == true) {

    // } else {

    // }

    shop = new Shop(data)
    try {
        shop.food = await shop.save()

    } catch (err) {
        error = true
        resp.message = "food cannot be added"
        resp.err = err
        console.log(err);
    }

    if (error) {
        resp.status = "fail"
        res.json(resp)
        return
    }

    console.log(resp)
    resp.status = "success"
    res.json(resp)

})

//edit the shop information
router.put('/shop', (req, res) => {

    
})


module.exports = router;
