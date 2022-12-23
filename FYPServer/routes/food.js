const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Food = require('../models/food');

router.get('/food', (req, res) => {
    let requesterid = req.query.requesterid

    Food.find().exec().then(result => {
        res.json({ status: "success", users: result })
    }).catch(err => {
        res.json({ status: "fail", message: err })
    })

})
router.post('/food/:id', async (req, res) => {
    let foodid = req.params.id
    let food = null
    let foodFound = false
    let resp = {}
   
    food =  await Food.findOne({_id:foodid}).exec()

    if (food != null) {
        foodFound = true
    }
    if (foodFound) {
        resp.food = food
        resp.message = "Food found"
        resp.status = "success"
        console.log(resp)
    }
    res.json(resp)
})
router.post('/food', async (req, res) => {
    console.log("sdhfkasdfhkjs")
    let requesterid = req.body.requesterid
    let data = req.body.food


    let error = false
    let resp = {}
    let food = null
    let isCreate = true

    // if (data.isCreate != undefined || data.isCreate == true) {

    // } else {

    // }

    food = new Food(data)
    try {
        resp.food = await food.save()

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


router.put('/food', (req, res) => {

})


module.exports = router;
