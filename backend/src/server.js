import express from "express"
import { PORT } from './config/serverConfig.js'
import authRoutes from './routes/auth.js'
import chatRoutes from './routes/chat.js'
import userRoutes from './routes/user.js'
import {connectDb} from "./lib/db.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from "path"


const app = express();

const __dirname = path.resolve()
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true // allow frontend to send cookies
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth' , authRoutes)
app.use('/api/user' , userRoutes)
app.use('/api/chat' , chatRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname , "../frontend/dist")))

    app.get("*" , (req , res) => {
        res.sendFile(path.join(__dirname , "../frontend" , "dist" , "index.html"))
    })
}

app.listen(PORT , () => {
    console.log(`Server Started On PORT : ${PORT}`)
    connectDb()
    // console.log(authRoutes)
})