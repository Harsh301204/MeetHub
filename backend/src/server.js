import express from "express"
import { PORT } from './config/serverConfig.js'
import authRoutes from './routes/auth.js'
import {connectDb} from "./lib/db.js";


const app = express();

app.use(express.json())
app.use('/api/auth' , authRoutes)

app.listen(PORT , () => {
    console.log(`Server Started On PORT : ${PORT}`)
    connectDb()
    // console.log(authRoutes)
})