import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required: true, 
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
    nic: {
        type: String,
        required: [true, "NIC Is Required!"],
        minLength: [12, "NIC Must Contain Only 12 Digits!"],
        maxLength: [12, "NIC Must Contain Only 12 Digits!"],
      },
      dob: {
        type: Date,
        required: [true, "DOB Is Required!"],
      },
      gender: {
        type: String,
        required: [true, "Gender Is Required!"],
        enum: ["Male", "Female"],
      },
      password: {
        type: String,
        required: [true, "Password Is Required!"],
        minLength: [8, "Password Must Contain At Least 8 Characters!"],
        select: false,
      },
      role: {
        type: String,
        required: true,
        enum: ["Patient", "Doctor", "Admin"],
      },
      doctorDepartment:{
        type: String,
      },
      docAvatar: {
        public_id: String,
        url: String,
      },


});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};
userSchema.methods.generateJsonWebToken=function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
    });
}
export const User=mongoose.model("User",userSchema);