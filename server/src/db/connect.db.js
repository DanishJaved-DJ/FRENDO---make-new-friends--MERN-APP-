import mongoose from 'mongoose';

const connectDb = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
          console.log(`\nmongoDb is conected to : ${connectionInstance.connection.host}`);
          
    } catch (err) {
        console.log("MongoDB connection error",err);
        process.exit(1);
        
    }
}

export default connectDb;