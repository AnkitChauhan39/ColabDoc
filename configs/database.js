const mongoose = require("mongoose") 
require("dotenv").config()

console.log(process.env.MONGO_URL)
const dbConnect = async () => {  
    await mongoose.connect(process.env.MONGO_URL,{   
        useNewUrlParser:true,
        useUnifiedTopology: true,   
    }) 
    .then(() => {console.log("Database connection successfull")})
    .catch((error) =>{
        console.log(error)  
        console.log("Database connection unsuccessfull")
    }) 
}
 
module.exports = dbConnect 