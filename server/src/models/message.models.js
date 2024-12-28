// models/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true
 },
  receiver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
 }, // Null for group messages
  groupId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Group' 
    }, // Null for private messages
  content: { 
    type: String, 
    required: true 
},
  fileUrl: {
     type: String 
    }, // Optional file attachment
  isRead: { 
    type: Boolean, 
    default: false 
}
},{
  timestamps:true
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
