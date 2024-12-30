import User from "../../models/user.models.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";

const generateAccessToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const accessToken = user.generateToken();
  return accessToken;
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Every field is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(400, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Wrong password");
    }

    // Generate the access token
    const accessToken = await generateAccessToken(user?._id); // Use `await` here
    
    // Sending to the cookies
    const loggedInUser = await User.findById(user._id).select("-password");

    const option = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, option) // Use `accessToken` (fixed variable name case)
      .json(
        new ApiResponse(
          200,
           "User logged in successfully",
          {
            user: loggedInUser,
            accessToken,
          },
         
        )
      );
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Error while logging in",
    });
  }
};

export default loginController;
