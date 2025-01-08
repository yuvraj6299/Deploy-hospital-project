import mongoose from "mongoose";
// import {Mongoose} from "mongoose"
import validator from "validator";

const appointmentSchema=new mongoose.Schema({
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
     
      appointment_date: {
        type: String,
        required: [true, "Appointment Date Is Required!"],
      },
      department: {
        type: String,
        required: [true, "Department Name Is Required!"],
      },
      doctor: {
        firstName: {
          type: String,
          required: [true, "Doctor Name Is Required!"],
        },
        lastName: {
          type: String,
          required: [true, "Doctor Name Is Required!"],
        },
      },
      hasVisited: {
        type: Boolean,
        default:false,
      },
      address: {
         type: String,
        required: [true, "Address Is Required!"],
       },
      doctorId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Doctor Id Is Invalid!"],
      },
      patientId: {
        type: mongoose.Schema.ObjectId,
        // ref: "User",
        required: [true, "Patient Id Is Required!"],
      },
      status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
      },

});

export const Appointment= mongoose.model("Appointment",appointmentSchema);