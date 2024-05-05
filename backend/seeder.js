// The script that we will run to seed our data

import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js"
import products from "./data/products.js"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

// So we can use those variables
dotenv.config();


// So before we wanna import any users or products or orders, we should delete them all
const importData = async() => {
    try {
        await connectDB();
        
        // It will delete everything if we didn't pass anything in
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // So now we are going to insert the dummy data into the User model
        // this method will return an array of the inserted users
        const createdUsers = await User.insertMany(users);


        // We want the products insert to be only with the admin
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser};
        });
        await Product.insertMany(sampleProducts);
        

        console.log('Data Imported'.green.inverse);
        process.exit(); //To end the process (not to kill it tho, but , if you want, pass 1 as argument)
    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }   
}

const destroyData = async () => {
    try {
        await connectDB();

        
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log(`Data Destroyed!`.red.inverse);
        process.exit();
    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

//Control of the run commande
if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}
