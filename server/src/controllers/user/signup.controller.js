import User from '../../models/user.models.js';
import ApiError from '../../utils/apiError.js';
import ApiResponse from '../../utils/apiResponse.js';
import uploadOnCloudinary from '../../utils/cloudinary.js';

const signupController = async (req,res)=>{
    if (!req.body) {
        return res.status(400).json({ message: "Request body is missing", success: false });
    }
    const {username,email,password,confirmPassword} = req.body;
    // console.log(username,email,password);
    
    if(!username || !email || !password || !confirmPassword){
        throw new ApiError(400,"All fields are required");
    }
     
    if(!(password==confirmPassword)){
        throw new ApiError(400,"Password and confirmPassword do not match");
    }

    const existUser = await User.findOne({
        $or : [{username},{email}]
    });

    if(existUser){
        throw new ApiError(409,"Username or email already exist");
    }

    //multer
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log("localPath",avatarLocalPath);
    

    let coverImageLocalPath;
    if(req.files &&  Array.isArray(req.files.coverImage)  && req.files.coverImage.length>0){
        coverImageLocalPath = req.files.coverImage[0].path;
  }

  if(!avatarLocalPath){
    throw new ApiError(400,"Avatar field is required");
}

//upload to cloudinary
const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if(!avatar){
    throw new ApiError(400,"Avatar field is required");
}

//datbase entry
const user =await User.create({
    username,
    avatar:avatar.url,
    coverImage : coverImage?.url || "",
    email ,
    password ,
});

const userCreated = await User.findById(user._id).select("-password");

if(!userCreated){
    throw new ApiError(500,"Something went wrong while creating user entry");
}


return res.status(200).json(
    new ApiResponse(200,userCreated,"user registed Successfully")
)


}

export default signupController;

