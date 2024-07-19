const mongoose = require('mongoose')
const feedbackSchema = mongoose.Schema({
    feedback:{
        type:String,
        required:true
    }
})
const feedback = mongoose.model('Feedback-Form',feedbackSchema)
module.exports = feedback