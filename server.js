const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect(process.env.DB).then(()=>{
    console.log('Database Connected Successfully')
})

app.use(cors())
app.use(express.json())
const blogRouter = require('./Router/blogRoutes')
app.use('/api/',blogRouter)

const userRouter = require('./Router/userRoutes')
app.use('/',userRouter)

const profileImgRouter = require('./Router/profileImgRoute')
app.use('/api/',profileImgRouter)

const feedbackRouter = require('./Router/feedbackRoute')
app.use('/',feedbackRouter)


app.get('/',(req,res)=>{
    res.send('Hello world')
})
app.listen(process.env.PORT,()=>{
    console.log(`Server Started Successfully ${process.env.PORT}`)
})