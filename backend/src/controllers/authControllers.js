import { createStreamUser } from "../lib/stream.js";
import User from "../Models/User.js";
import jwt from 'jsonwebtoken'

const signUp = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 Characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists , use a different email" })
        }

        const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1-100
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvatar,
        })

        await createStreamUser({
            id : newUser._id.toString(),
            name : newUser.fullName,
            image : newUser.profilePic || "",
        })

        const token = jwt.sign({
            id: newUser._id,
            email: newUser.email
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        )

        res.cookie("jwt" , token , {
            maxAge : 7 * 24 * 24 * 1000,
            httpOnly : true,
            samesite : 'strict',
            secure : process.env.NODE_ENV === "production"
        })

        res.status(201).json({ success : true , user : newUser})
    } catch (error) {
        console.log("error in controller : " ,error);
        res.status(500).json({message : "Internal Server Error"})
    }
}

const login = async (req, res) => {
    try {
        const {email , password } = req.body;

        if(!email || !password) {
            return res.status(400).json({message : "Email or Password is Missing"})
        }

        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return res.status(401).json({message : "Invalid Email or Password"})
        }

        const passwordCheck = await existingUser.comparePassword(password);
        if(!passwordCheck) return res.status(401).json({message : "Invalid Email or Password"});

        const token = jwt.sign({
            id: existingUser._id,
            email: existingUser.email
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        )

        res.cookie("jwt" , token , {
            maxAge : 7 * 24 * 24 * 1000,
            httpOnly : true,
            samesite : 'strict',
            secure : process.env.NODE_ENV === "production"
        })

        res.status(201).json({ success : true , user : existingUser})
    } catch (error) {
        console.log("error in controller : " ,error);
        res.status(500).json({message : "Internal Server Error"})
    }
}

const logout = async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({success : true , message : "User Logged Out successfully"})
}

const onBoard = async (req , res) => {

}

export { login, logout, signUp , onBoard}