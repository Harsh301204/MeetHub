import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const SALT = bcrypt.genSaltSync(10);

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    bio: {
        type: String,
        default: ""
    },

    profilePic: {
        type: String,
        default: ""
    },

    nativeLanguage: {
        type: String,
        default: ""
    },

    learningLanguage: {
        type: String,
        default: ""
    },

    location: {
        type: String,
        default: ""
    },

    isOnBoard: {
        type: Boolean,
        default: false
    },

    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]


}, { timestamps: true })

userSchema.pre('save', function (next) {
    try {
        const hash =  bcrypt.hashSync(this.password, SALT);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }

})

userSchema.methods.comparePassword = async function compare(password){
    return bcrypt.compareSync(password , this.password)
}

const User = mongoose.model("User", userSchema)
export default User