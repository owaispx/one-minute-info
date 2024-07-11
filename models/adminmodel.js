import mongoose from "mongoose";
const Info = mongoose.models.Info ||

mongoose.model ("Info",{

    title : String, 
    source : String,
    description : String ,
    imageurl : String

});
export default Info;