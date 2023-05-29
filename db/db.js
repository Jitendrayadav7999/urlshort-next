import mongoose from "mongoose"

async function connectDb (){
      try {
        if(mongoose.connections[0].readyState){
            console.log("Db all ready Connected")
            return
        }
        await mongoose.connect("mongodb+srv://Jitendra_yadav:Kunal8602@cluster0.rt7ec4u.mongodb.net/TinyURl")
        console.log("MongoDb is Connected")
      } catch (error) {
        console.log(error)
      }
}
export default connectDb