import mongoose from "mongoose"

async function connectDb (){
      try {
        if(mongoose.connections[0].readyState){
            console.log("Db all ready Connected")
            return
        }
        await mongoose.connect(process.env.MONGO_DB)
        console.log("MongoDb is Connected")
      } catch (error) {
        console.log(error)
      }
}
export default connectDb