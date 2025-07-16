import express from "express"
import { PORT } from './config/serverConfig.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import {connectDb} from "./lib/db.js";
import cookieParser from 'cookie-parser'


const app = express();

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth' , authRoutes)
app.use('/api/user' , userRoutes)

app.listen(PORT , () => {
    console.log(`Server Started On PORT : ${PORT}`)
    connectDb()
    // console.log(authRoutes)
})