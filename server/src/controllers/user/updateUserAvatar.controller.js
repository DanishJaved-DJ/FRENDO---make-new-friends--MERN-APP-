import ApiError from '../../utils/apiError.js';
import ApiResponse from '../../utils/apiResponse.js';
import User from '../../models/user.models.js';
import uploadOnCloudinary from '../../utils/cloudinary.js';

const updateUserAvatarController = async (req,res)=>{
    try {
        //multer
        const avatarLocalPath = req.files.avatar[0].path;
        console.log("avatarLocalPath",avatarLocalPath);
        
    if(!avatarLocalPath){
          throw new ApiResponse(400,"avatar file is missing");
    }
    
let coverImageLocalPath;
    if(req.files &&  Array.isArray(req.files.coverImage)  && req.files.coverImage.length>0){
        coverImageLocalPath = req.files.coverImage[0].path;
  }
  console.log("coverImageLocalPath",coverImageLocalPath);
  
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    
    const coverimage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar.url){
          throw new   ApiError(400,"Avtar file is not uploaded on cloudinary");
    }

    const user = await User.findByIdAndUpdate(
          req.user?._id,
          {
                $set : { 
                      avatar : avatar.url,
                      coverimage : coverimage?.url || ""
                }
          },
          {
                new : true
          }
    ).select("-password");

    return res
             .status(200)
             .json(
                new ApiResponse(200,{
                      user
                },"Avatar file updated successfully")
             )

    } catch (err) {
        throw new ApiError(400,"Error while updating avatar");
    }
}

export default updateUserAvatarController;