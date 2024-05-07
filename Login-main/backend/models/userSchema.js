const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

// making userschema 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"please enter your name"],
        maxLength:[30,"name should not exceed 30 letters"],
        minLength:[4,"name should be more than 4 letteres"]
    },
    email:{
        type:String,
        require:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"please enter valid email "]
    },
    password :{
        type:String,
        require:[true,"please enter your password"],
        minLength:[4,"please enter your password more than 4 strings"],
        select:false,
        
    },
    role:{
        type:String,
        default:"user",
        
    },
    avatar:{
        public_id:{
            type:String,    
            require:true,
        },
        url:{
            type:String,
            require:true,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    resetPasswordToken:String,
    resetPasswordExpire:Date,


})

//methods

// encrypt password 

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }


    this.password = await bcrypt.hash(this.password,15)
}) 

//jwt token 

userSchema.methods.getJWTtoken  = function (){
   return jwt.sign({id:this._id},process.env.JWTKey,{
        expiresIn:process.env.JWT_expire,

    })  
    
}  

//compare password 

userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)

}
  
  



userSchema.methods.getResetPasswordToken = async function(){

 
    //generating token 

    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing and adding resetPassword token to userschema

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now()+ 15*60*1000;

    return resetToken;
}

module.exports = mongoose.model("User",userSchema) ;

