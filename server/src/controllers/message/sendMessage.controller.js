import Message from '../../models/message.models.js';
import User from '../../models/user.models.js';
import ApiError from '../../utils/apiError.js';
import ApiResponse from '../../utils/apiResponse.js';
import uploadOnCloudinary from '../../utils/cloudinary.js';

// Send a Message
const sendMessageController = async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const senderId = req.user._id; 

    // Validate required fields
    if (!recipientId || !content) {
     throw new ApiError(400,'Recipient ID and message content are required')
    }

    // Check if recipient exists
    const recipient = await User.findById(recipientId).select("-password");
    console.log("recipient User : " ,recipient.username);
    
    if (!recipient) {
     throw new ApiError(400,'Recipient not found')
    }
    //multer
  let fileUrlLocalPath;
  if(req.files && Array.isArray(req.files.fileUrl) && req.files.fileUrl.length > 0){
      fileUrlLocalPath = req.files?.fileUrl[0].path;
  }
  //upload on cloudinary
      const uploadResult = await uploadOnCloudinary(fileUrlLocalPath);
     const fileUrl = uploadResult.url;
  

    

    // Create a new message
    const message = await Message.create({
      sender: senderId,
      recipient: recipientId,
      content: content,
      fileUrl : fileUrl || ""
    });

     console.log("Message : ",message);
     
    const messageData =  {
        id: message._id,
        sender: message.sender,
        recipient: message.recipient,
        content: message.content,
        fileUrl : message.fileUrl,
        timestamp: message.createdAt,
      };

      return res.status(200).json(
        new ApiResponse(200,messageData,"Message send successfully")
      );

  } catch (err) {
    throw new ApiError(400,"Error in sending Message")
  }
};

export default sendMessageController;