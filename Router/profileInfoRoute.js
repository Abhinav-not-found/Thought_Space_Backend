const express = require('express')
const router = express.Router()
const Model = require('../Models/profileInfoModel')

router.put('/settings/profileInfo',async(req,res)=>{
    try {
        const data = req.body;
        const newData = new Model(data)
        const savedData = await newData.save()
        res.status(200).json({
            message:'Data Saved Successfully',savedData
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }
    
})

module.exports = router