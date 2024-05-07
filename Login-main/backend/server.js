const app = require("./app");
const  dotenv = require("dotenv");
const mongodb = require("./database")
const cloudinary = require("cloudinary")
      
         
//giving path to config 
dotenv.config({path:"./config/config.env"})

// connected mongodb to server           
mongodb();    

//cloudinary connection
              
cloudinary.config({ 
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });


     
 


app.listen(process.env.PORT ,()=>{
    console.log(`connected successfully ${process.env.PORT}`)
})
 

 




