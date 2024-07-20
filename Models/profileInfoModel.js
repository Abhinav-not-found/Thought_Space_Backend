const mongoose = require('mongoose')
const profileInfoSchema = mongoose.Schema({
    bio:{
        type:String,
        required:true,
    },
    user:{
        type:String,
        required:false
    },
    instagram:{
        type:String,
        required:false
    },
})
const profileInfo = mongoose.model('profileInfo',profileInfoSchema)
module.exports = profileInfo