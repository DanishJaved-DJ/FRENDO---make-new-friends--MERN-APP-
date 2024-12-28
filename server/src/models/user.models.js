import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    username : {
        type : String ,
        required : true ,
        unique : true ,
        trim : true,
        index : true  // optimal way for seaching 
    },
    email : {
        type : String ,
        required : true ,
        unique : true ,
        lowercase : true ,
        trim : true
     
    },
    avatar : {
        type : String ,// cloudinary URL
    },
    coverimage : {
        type : String ,// cloudinary URL
    },
    password : {
        type : String ,
        required : [true , "Password is required"]
    },
    bio: { 
        type: String,
         default: '' 
    },
    status: {
         type: String,
          default: 'Available' 
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] ,

    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
    createdAt: { 
        type: Date,
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
},{
    timestamps : true
});

//middleware mongoose hook , pre "save"-> perform operation before data save 

// bcrypting password
userSchema.pre("save", async function(next) {
     if (!this.isModified("password")) return next();
     this.password = await bcrypt.hash(this.password, 10);
     next();
});

// function to compare password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password);
}

//jwt token
userSchema.methods.generateToken = function(){
    //payload = data store
    return jwt.sign(
        {
            // payload : comes from database
            _id : this._id,
            email : this.email,
            username : this.username,
        } ,
        process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_EXPIRY
        }
    )
}


 
const User = mongoose.model("User",userSchema);

export default User;