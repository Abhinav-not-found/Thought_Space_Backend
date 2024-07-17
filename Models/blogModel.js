const mongoose = require('mongoose')
const blogModel = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:false
    }
})
const blog = mongoose.model('blog',blogModel)
module.exports = blog