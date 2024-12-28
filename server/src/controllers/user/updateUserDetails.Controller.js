import User from "../../models/user.models.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";

const updateUserDetailsController = async (req,res)=>{
      try {
        const userId = req.user._id;

        const { username,email, bio, status} = req.body;

        if (email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw new ApiError(400,"Invalid email format")
          }

      const updatedUser = await User.findByIdAndUpdate(userId,
        {
            $set : {
                    username : username,
                    email : email,
                    bio : bio,
                    status : status
            }
        },{
            new : true
        }).select("-password");

        if(!updatedUser){
            throw new ApiError(400,"user not found"); 
        }
        const updatedData = {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        bio: updatedUser.bio,
        status: updatedUser.status,
        };

        return res.status(200).json(
            new ApiResponse(200,updatedData,"Profile updated SuccessFully")
        );

        
      } catch (err) {
         throw new ApiError(400,"Something Wenrt wrong while updating User Detais");
      }
}
export default updateUserDetailsController;