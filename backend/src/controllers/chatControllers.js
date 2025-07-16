import { generateStreamToken } from "../lib/stream.js"


export async function getStreamToken(req , res) {
    try {
        const token = await generateStreamToken(req.user.id)
        res.status(200).json({token})
    } catch (error) {
        console.log("Error while getting stream token")
    }
}