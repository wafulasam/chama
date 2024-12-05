// main app
import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";

const app = express()
const port = 3000
app.use(express.json())

// use routes
app.use('/api', userRoutes)

// health check route
app.get('/', (req:Request, res:Response)=> {
    res.send('welcome to chama api')
})

// start the server
app.listen(port, ()=> {
    console.log(`server running on port ${port}`)
})