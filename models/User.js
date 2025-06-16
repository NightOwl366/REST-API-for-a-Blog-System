import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [25, "Name cannot exceed 25 characters"],
        minlength: [2, "Name must be at least 2 characters"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        validate: {
            validator: v => validator.isMobilePhone(v, 'any'),
            message: props => `${props.value} is not a valid Number`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: v => validator.isEmail(v),
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const User = mongoose.model("User", UserSchema);
export default User;