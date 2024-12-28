import ApiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const verifyJWt = async (req,res,next)=>{

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","");
    
        if(!token){
            throw new ApiError(401,"Unauthorized error");
        }
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
    
    const user = await User.findById(decodedToken?._id).select("-password");
          
    if(!user){
        throw new ApiError(401,"Invalid access token");
    }
    
    req.user=user;
    next();
    } catch (err) {
        throw new ApiError(401,"error");
        
    }
}
export default verifyJWt;