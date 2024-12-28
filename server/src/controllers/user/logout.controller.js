import User from "../../models/user.models.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js"; // Ensure this is the correct path

const logoutController = async (req, res) => {
  try {
    const option = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", option)
      .json(new ApiResponse(200, {}, "User logged out successfully"));
  } catch (err) {
    // Return error response instead of throwing
    return res.status(500).json({
      message: err.message || "Error while logging out",
      success: false,
      error: true,
    });
  }
};

export default logoutController;
