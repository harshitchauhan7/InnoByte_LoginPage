const ErrorHandler = require("../utils/errorHandler");
const catchasyncerror = require("./catchasyncerror");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

exports.isAuthenticatedUser = catchasyncerror(async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("please login to move further",401))
    }

    const decodedData = jwt.verify(token,process.env.JWTkey)

    req.user = await User.findById(decodedData.id)

    next();
})
 

  
exports.isRoleAuthentication = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };
  
   