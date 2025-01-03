// main app
import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import activityRoutes from "./routes/activityRoutes";
import memberRoutes from "./routes/memberRoutes";
import roleRoutes from "./routes/roleRoutes"; 
import sequelize from "./databaseConfig";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express()
const port = 3000
app.use(express.json())
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true,
}));

// use routes
app.use('/api', [
  userRoutes,
  activityRoutes,
  memberRoutes,
  roleRoutes
]); 

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