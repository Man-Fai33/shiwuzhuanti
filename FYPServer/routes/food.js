const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Food = require('../models/food');

router.get('/', (req, res) => {
    let requesterid = req.query.requesterid

    Food.find().exec().then(result => {
        res.json({ status: "success", food: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })

})
router.get('/:id', (req, res) => {
    let requesterid = req.params.id


    Food.findById(requesterid).exec().then(result => {
        res.json({ status: "success", food: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })

})
router.put('/:id', async (req, res) => {

    let id = req.params.id

    let target = req.body.food


    Food.findByIdAndUpdate(target._id, target, { new: true }).exec().then(updatedFood => {
        res.json({ status: "success", food: updatedFood })
    })


})




module.exports = router;
