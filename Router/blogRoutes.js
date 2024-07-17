const express =require('express')
const router = express.Router()
const Model = require('../Models/blogModel')
router.get('/',async(req,res)=>{
    try {
        const blogs = await Model.find();
        res.status(200).json({blogs})
    } catch (error) {
        res.status(500).json({message:'Internal Server Error',error})
    }
})
router.get('/blog/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const blog = await Model.findById(id)
        res.json({blog})
    } catch (error) {
        res.status(500).json({message:'Internal Server Error',error})
    }
})
router.put('/blog/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const data = req.body
        const blog = await Model.findByIdAndUpdate(id,data,{new:true})
        res.status(200).json({message:'Updated Successfully'})
    } catch (error) {
        res.status(500).json({message:'Internal Server Error',error})
    }
})
router.post('/createblog',async(req,res)=>{
    try {
        const data = req.body
        const blog = new Model(data)
        const newblog = await blog.save()
        res.status(200).json({message:'Blog Created Successfully'})
    } catch (error) {
        res.status(500).json({message:'Internal Server Error',error})
    }
})
router.delete('/blog/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const blog = await Model.findByIdAndDelete(id)
        res.status(200).json({message:'Blog Deleted Successfully'})
    } catch (error) {
        res.status(500).json({message:'Internal Server Error',error})
    }
})
module.exports = router