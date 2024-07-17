const mongoose = require('mongoose')
const userModel = mongoose.Schema({
    email:{
        required:true,
        type:String,
        unique:true
    },
    username:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    }
})
const user = mongoose.model('user',userModel)
module.exports = user