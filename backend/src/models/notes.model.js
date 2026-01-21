import mongoose from 'mongoose'
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