import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    longUrl:{
        type:String,
        required:true
    },
    urlCode:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true
    }
},{timestamps:true})

export default  mongoose.models.url || mongoose.model("url",shortUrlSchema)