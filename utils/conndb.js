import mongoose from "mongoose";

const url =process.env.DB_URL;

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