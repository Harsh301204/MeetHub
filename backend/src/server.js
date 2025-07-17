import express from "express"
import { PORT } from './config/serverConfig.js'
import authRoutes from './routes/auth.js'
import chatRoutes from './routes/chat.js'
import userRoutes from './routes/user.js'
import {connectDb} from "./lib/db.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express();
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true // allow frontend to send cookies
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth' , authRoutes)
app.use('/api/user' , userRoutes)
app.use('/api/chat' , chatRoutes)

app.listen(PORT , () => {
    console.log(`Server Started On PORT : ${PORT}`)
    connectDb()
    // console.log(authRoutes)
})