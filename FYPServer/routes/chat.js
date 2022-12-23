const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Comment =require('../models/comment');



//create a chat comment 
router.post('/chat', async (req, res) => {
    let requesterid = req.body.requesterid

    if (user == null) {
        resp.status = "fail"
        resp.message = "The requester is not a valid user"
        res.json(resp)
        return
    }



    // Create session
    let session = await mongoose.startSession()
    session.startTransaction()
    
    if (error) {
        resp.status = "fail"
        res.json(resp)
        await session.abortTransaction()
        session.endSession()
        return
    }


    if (error) {
        resp.status = "fail"
        res.json(resp)
        await session.abortTransaction()
        session.endSession()
        return
    }

    await session.commitTransaction()
    session.endSession()

    resp.status = "success"
    res.json(resp)
})
module.exports = router