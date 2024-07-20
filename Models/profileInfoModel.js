const mongoose = require('mongoose')
const profileInfoSchema = mongoose.Schema({
    bio:{
        type:String,
        required:true,
    },
    instagram:{
        type:String,
        required:false
    },
})
const profileInfo = mongoose.model('profileInfo',profileInfoSchema)
module.exports = profileInfo