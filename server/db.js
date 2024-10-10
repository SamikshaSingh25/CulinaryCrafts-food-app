const mongoose = require('mongoose'); //#mongoose
require('dotenv').config(); // Load environment variables from .env file

const dbURI = process.env.MONGODB_URI;
const connectToMongo = async () => {
    await mongoose.connect(dbURI)
    const db = mongoose.connection
    db.on("error", console.error.bind(console,"mongoose connection error"))
    db.once("open", ()=>{console.log("connected to mongo db")} )
}
module.exports=connectToMongo