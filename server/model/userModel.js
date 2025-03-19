import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String, // Store image URL or base64 string
        required: true,
    },
    age: {
        type: Number, // Age should be a number, not a string
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
});

// Virtual field to replace _id with id
userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

export default mongoose.model("Users", userSchema);
