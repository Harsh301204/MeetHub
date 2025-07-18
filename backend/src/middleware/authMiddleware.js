import jwt from 'jsonwebtoken'
import User from '../Models/User.js'

export const protectedRoute = async (req , res , next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({message : "Unauthorized , no token provided"})
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);
        if(!decoded) {
            return res.status(401).json({message : "Unauthorized : invalid TOken"})
        }
        console.log(decoded)

        const user = await User.findById(decoded.id).select("-password");
        if(!user) {
            return res.status(401).json({message : "User not found"})
        }

        req.user = user;
        next()
    } catch (error) {
        console.log("Error is authMiddleware protectedRoute")
    }
}