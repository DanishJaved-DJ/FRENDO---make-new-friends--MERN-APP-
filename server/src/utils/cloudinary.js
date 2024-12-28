import { v2 as cloudinary } from 'cloudinary';
import {response} from 'express';
import fs from 'fs';

 // Configuration
 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
    
    // Upload an image
const uploadOnCloudinary = async(localfilePath)=>{
    try {
        if(!localfilePath) return null;

        console.log("uploading...");

        const response = await cloudinary.uploader.upload(localfilePath,{
            resource_type : "auto"
        });

        // file has been uoloaded
         //remove the temporary local file as uploader operation complete
        fs.unlinkSync(localfilePath);

        console.log("file has been uploaed successfully on cloudinary", response.url);

        return response;
        
    } catch (err) {
        fs.unlinkSync(localfilePath); 
        //remove the temporary local file as uploader operation fails
        console.log("error while cloudinary upload");
        return null;
    }
}


export default uploadOnCloudinary;