import User from '../../models/user.models.js';
import ApiError from '../../utils/apiError.js';
import ApiResponse from '../../utils/apiResponse.js';

// Get User Profile
const fetchUserProfileController = async (req, res) => {
  try {
    const userId = req.user._id; 

    // Fetch the user from the database
    const user = await User.findById(userId).select('-password'); 

    if (!user) {
     throw new ApiError(400,"User is not Found"); 
    }

    const UserProfile = {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar : user.avatar,
        coverimage : user.coverimage || "",
        bio: user.bio,
        status: user.status,
        friends: user.friends,
        createdAt: user.createdAt,
      };

      return res.status(200).json(
        new ApiResponse(200,UserProfile,"userProfile Successfully fetched")
    )

  } catch (error) {
      throw new ApiError(400,"Error while fetching user Detail")
  }
};

export default fetchUserProfileController;
