import mongoose from "mongoose";

const url = "mongodb://localhost:27017/next-db"

const connectdb  = async ()=> {
    if (mongoose.connections [0].readystate) {
        return;
    }
    try {
      await  mongoose.connect(url);
      console.log ("connected to database")

    }catch(error){
        console.error(error);
    }
}
export default connectdb;