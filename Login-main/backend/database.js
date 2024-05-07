const mongoose = require("mongoose");
 
const connectmongodb = ()=>{
    mongoose.connect(process.env.database_url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        console.log(`connected successfully to url ${process.env.database_url}`)
    }).catch((e)=>{
        console.log(e)
 
    }) 
}          
  
module.exports = connectmongodb; 