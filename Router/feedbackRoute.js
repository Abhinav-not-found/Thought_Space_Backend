const express = require('express')
const router = express.Router()
const Model = require('../Models/feedbackModel')

router.post('/setting/feedback',async(req,res)=>{
    try {
        const {feedback} = req.body
        const newFeedback = new Model({feedback})
        const  feedbackSave = await newFeedback.save()
        res.status(200).json({
            message:"Feedback Sent Successfully",
            feedbackSave
        })
    } catch (error) {
        res.status(500).json({
            message:"Something Went Wrong",
            error
        })
    }
})
module.exports = router