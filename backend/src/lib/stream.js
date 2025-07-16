import { StreamChat } from 'stream-chat'


const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET

if(!apiKey || !apiSecret) {
    console.error("Stream api key or secret missing")
}

const streamClient = StreamChat.getInstance(apiKey , apiSecret)

export const createStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData);
        return userData;
    } catch (error) {
        console.error("Something went wrong while upserting the user")
    }
}

export const generateStreamToken = async (userId) => {
    // ensure userId is a string
    try {
        const userIdstr = userId.toString();
        return streamClient.createToken(userIdstr)
    } catch (error) {
        console.log("Error in generating Stream Token" , error)
    }
}