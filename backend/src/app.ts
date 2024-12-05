// main app
import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import sequelize from "./databaseConfig";

const app = express()
const port = 3000
app.use(express.json())

// use routes
app.use('/api', userRoutes)

// health check route
app.get('/', (req:Request, res:Response)=> {
    res.send('welcome to chama api')
})

// sync database and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
});