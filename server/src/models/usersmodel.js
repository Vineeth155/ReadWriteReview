import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    savedBooks:[{type: mongoose.Schema.Types.ObjectId, ref: "books"}]
})

export const UserModel = new mongoose.model("users", UserSchema);

