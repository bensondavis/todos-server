import mongoose from "mongoose";

async function init() {
    const mongodbUrl = process.env.MONGODB_URL;
    return mongoose.connect(mongodbUrl, ()=> console.log("connected successfully to database"));
}

export {init};