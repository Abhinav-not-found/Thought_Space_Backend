const mongoose = require('mongoose')
const imgSchema = mongoose.Schema({
    image:{
        type:String,
        required:false
    }
})
const profileImg = mongoose.model('profileImage',imgSchema)
module.exports = profileImg