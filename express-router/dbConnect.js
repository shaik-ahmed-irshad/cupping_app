import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect("Fatimakhadar:*****@fatima.9caem2j.mongodb.net/test")
        console.log("Mongo DB is Connected");

    } catch (error) {
        console.log(error); 
    }
}

connectDB();