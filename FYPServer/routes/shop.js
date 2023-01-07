const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Food = require('../models/food')
const Shop = require('../models/shop')
router.post('/', async (req, res) => {
    let requesterid = req.body.requesterid
    let target = req.body.shop
    // check if the email is duplicated
    let id = target.shopManager
    let error = false
    let resp = {}
    let foods = target.food
    let shop = null

    try {
        // find a user with a duplicated email
        shop = await Shop.findOne({ shopManager: id }).exec()
        if (shop != null) {
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

    foods.forEach(element => {
        new Food(element).save()

    });


    // generate a userid for the user
    shop = new Shop(target)
    try {
        resp.shop = await shop.save()
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

    Shop.find().exec().then(result => {
        res.json({ status: "success", shop: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })
})
router.get('/:id', (req, res) => {
    let id = req.params.id
    Shop.findById(id).exec().then(result => {
        res.json({ status: "success", shop: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })
})
router.put('/:id', async (req, res) => {

    let id = req.params.id

    let target = req.body.shop

    Shop.findByIdAndUpdate(target._id, target, { new: true }).exec().then(updatedShop => {
        res.json({ status: "success", shop: updatedShop })
    })


})
module.exports = router;