require('dotenv').config();
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)




mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000, // 20 seconds
},
    ).then((data)=>{
        console.log('DATABASE CONNECTION SET')
    }).catch((err)=>{
        console.log(err)
    })