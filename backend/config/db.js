import mongoose from "mongoose"

// any methode that we are gonna call from mongoose it will return a promise so for 
//  that , we will use asynchronous 
const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB

/**process is a global object in Node.js that provides information about the current
 *  Node.js process. It allows you to interact with the running process, including
 *  accessing environment variables, exiting the process, and listening for signals. */
