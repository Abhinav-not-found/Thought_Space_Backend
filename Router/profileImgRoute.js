const express = require('express')
const router = express.Router()
const Model = require('../Models/imgModel')
router.post('/settings',async(req,res)=>{
    try {
        const data = req.body
        const upload = new Model(data)
        const profileImage = upload.save()
        res.status(200).json({message:'Upload Successfull', profileImage})
    } catch (error) {
        res.status(500).json({message:'Upload Failed!'})
        
    }
})
module.exports = router