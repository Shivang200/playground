const express = require('express')

const { default: mongoose } = require('mongoose')
const userrouter = require('./routes/users.js')
const newUserModel = require('./models/model.js')
require('dotenv').config();

const app = express()
app.use(express.json());
app.use('/user',userrouter);




mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connected")
   
    app.listen(process.env.PORT, () => console.log(process.env.PORT))
}).catch((e)=>{
    console.log(e);
})