import dotenv from 'dotenv';
dotenv.config(
    {
        path : './env'
    }
);

import app from './app.js';
import connectDb from '../src/db/connect.db.js';

const PORT = process.env.PORT || 6000;
 
connectDb()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is listening at : ${PORT}`);
        
    })
})
.catch((err)=>{
    console.log("Mongodb connection Failed ",err);
})


