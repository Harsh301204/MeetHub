import express from "express"
import { PORT } from './src/config/serverConfig.js'

const app = express();


app.get('/api/auth/login' , (req ,res) => {
    res.send("Login Route")
})

app.get('/api/auth/signup' , (req ,res) => {
    res.send("Signup Route")
})

app.get('/api/auth/logout' , (req ,res) => {
    res.send("Logout Route")
})

// app.get('/page' , (req ,res) => {
//     res.send("this was nothing but just routing")
// })

app.listen(5001 , () => {
    console.log(`Server Started On PORT : ${PORT}`)
})