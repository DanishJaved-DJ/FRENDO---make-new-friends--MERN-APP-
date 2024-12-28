import ApiError from '../../utils/apiError.js';
import ApiResponse from '../../utils/apiResponse.js';
import User from '../../models/user.models.js';

const changePasswordController = async(req,res)=>{
    try {
          const {oldPassword , newPassword} =req.body;

          if(!oldPassword || !newPassword){
            throw new ApiError(400,"all feild is required")
          }

          const user = await User.findById(req.user?._id);
          
          if(!user){
            throw new ApiError(400,"you are not Logged In");
          }

          const isValidPassword = await user.isPasswordCorrect(oldPassword);
          if(!isValidPassword){
            throw new ApiError(400,"invalid oldPassword");
          }

          user.password=newPassword;
          await user.save({
            validateBeforeSave : false
          });

          return res
          .status(200)
          .json(new ApiResponse(200,{},"Password changed successfully"))

    } catch (err) {
        throw new ApiError(400,"error in changing password")
    }
}

export default changePasswordController;