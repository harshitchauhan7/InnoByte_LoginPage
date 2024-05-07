const catchAsyncErrors = require("../middleware/catchasyncerror");
const User = require("../models/userSchema");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken")
const sendEmail = require("../middleware/sendEmail")
const crypto = require("crypto");
const cloudinary = require("cloudinary")




//Register a User 

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
  
    const { name, email, password } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
  
    sendToken(user, 201, res);
  });


//login user 

exports.loginUser = async(req,res,next)=>{
    const {email,password} = req.body;

    //checking if user has give password and email both
    if(!email||!password){
        return next(new ErrorHandler("please enter Email &password",400))

        
    }

    //find
    const user = await User.findOne({email}).select("+password")
 
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }
//comparing input password that mathces with our database

    const isPasswordMatches = await user.comparePassword(password)
    
    if(!isPasswordMatches){
        return next(new ErrorHandler("Invalid email or Password",401))
    }  
    
    sendToken(user,200,res);
    

}

//logout user 

exports.logoutUser = catchAsyncErrors(async(req,res,next)=>{

   res.cookie('token',null,{
    expireIN:new Date(Date.now()),
    httpOnly:true
   })


    res.status(200).json({
        success:true,
        message:"successfully logout"
    })
})  


exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });
//find all user
exports.findAllUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.find();

    res.status(200).json({
        message:"success",
        user
    })

})

// forgot password 

exports.forgotPassword = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("user not found",404));

    }

    //reset password token 
    const resetToken = await user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    //message send through email

    const message = `your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requeseted it kindly ignore it `
     
    try {
        await sendEmail({
            email:user.email,
            subject:"password recorvery token",
            message:message
        })
        res.status(200).json({
            success:true,
            message:`message sent to ${user.email} successfully`
        })


         
    } catch (error) {

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
    await user.save({validateBeforeSave:false})

    return next(new ErrorHandler(error.message,500))


        
    }




})


exports.resetPassword = catchAsyncErrors(async (req,res,next)=>{

    //creating a token hash 
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({
       resetPasswordToken,
       resetPasswordExpire : {$gt:Date.now()}


    })

    if(!user){
      return  next(new ErrorHandler("Reset password token is invalid or has been expired"))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("password doesnot match",400))

    }

    user.password = req.body.password;
    user.resetPasswordToken = undefine;
    user.resetPasswordExpire= undefine;

    sendToken(user,200,res);
})


//update user password 

exports.updatePassword = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatches = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatches){ 
        return next(new ErrorHandler("password not matched",400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password doesn't match",400))
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200,res);
})


//update user profile 

exports.updateUserProfile = catchAsyncErrors (async (req,res,next)=>{
    const newUserData ={
        name:req.body.name,
        email:req.body.email,
     
        
    }
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
     
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    })

    res.status(200).json({
      success:true,
      user

    })
})

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  });
  
  // Get single user (admin)
  exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`)
      );
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  });
  
  // update User Role -- Admin
  exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Delete User --Admin
  exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    const imageId = user.avatar.public_id;
  
    await cloudinary.v2.uploader.destroy(imageId);
  
    await user.remove();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });

  //get all user --admin
  exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  });