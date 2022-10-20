import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://sabiya:mymongodbaccount@sabiya.28lg5jn.mongodb.net/tasky-cfi")
        console.log("Mongo DB is Connected");

    } catch (error) {
        console.log(error); 
    }
}

connectDB();