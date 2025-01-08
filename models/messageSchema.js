import mongoose from "mongoose";
import validator from "validator";
const messageSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        mimLength:[3,"First name must contained At least 3 characters!"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name must contained At least 3 characters!"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please provide vaild emails!"] 
    },
    phone:{
        type:String,
        required:true,
        minLength:[11,"phone numbers must contains exact 11 digits!"],
        maxLength:[11,"phone numbers must contains exact 11 digits!"]
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"Message must contains at least 10 charcters"],
        
    },
})
export const Message=mongoose.model("Message",messageSchema);