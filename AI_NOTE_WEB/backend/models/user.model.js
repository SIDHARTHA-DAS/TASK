import mongoose from "mongoose";

// user data model create
const userSchema = new mongoose.Schema({
      name:{
        type: String,
        required:true
      },
      email:{
        type: String,
        unique:true,
        required: true
      },
      credits:{
        type:Number,
        default:500,
        min:0
      },
      isCreditAvailable:{
        type:Boolean,
        default:true
      },
      notes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Note",
        default:[]
      }
},{timestamps:true})



const UserModel = mongoose.model("UserModel", userSchema)

export default UserModel