const express = require('express')
const router = express.Router()
const Model = require('../Models/profileInfoModel')

router.put('/settings/profileInfo',async(req,res)=>{
    try {
        const {user,bio,instagram} = req.body;
        const data = {bio,instagram}
        
        const userAlreadyExist = await Model.findOne({user})
        if(userAlreadyExist){
            const updateUser = await Model.findOneAndUpdate(
                {user},{$set:data},{new:true}
            );
            res.status(200).json({message:'Data Updated Successfully',updateUser})
        }
        else{
            const newData = new Model(data)
            const savedData = await newData.save()
            res.status(200).json({
                message:'Data Saved Successfully',savedData
            })
        }


        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }
    
})

module.exports = router