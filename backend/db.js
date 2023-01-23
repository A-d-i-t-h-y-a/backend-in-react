const mongoose = require('mongoose')

// const mongoURI = "mongodb://localhost:27017/inotebook"
const mongoURI = "mongodb+srv://adithya:first_cluster@cluster0.oilwegb.mongodb.net/inotebook"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to mongo successfully");
    })
}

module.exports = connectToMongo;