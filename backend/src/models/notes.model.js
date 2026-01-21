import mongoose from 'mongoose'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
const notesSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    
    notes : {
        type: String,
        required: true
    }

}, {timestamps: true})




export const Notes = mongoose.model("notes", notesSchema);