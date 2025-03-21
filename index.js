import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js";


// import all routes
import userRoutes from './routes/user.routes.js';

dotenv.config()

const app = express()
app.use(express.json())

app.use(cors({
  origin:process.env.BASE_URL,
  credentials:true,
  methods:['GET','POST','DELETE','OPTIONS'],
  allowedHeaders:['Content-Type','Authorization']
}));

const port = process.env.PORT||4000;

// console.log("MAILTRAP_HOST:", process.env.MAILTRAP_HOST);
// console.log("MAILTRAP_PORT:", process.env.MAILTRAP_PORT);
// console.log("MAILTRAP_USERNAME:", process.env.MAILTRAP_USERNAME);
// console.log("MAILTRAP_PASSWORD:", process.env.MAILTRAP_PASSWORD);
// console.log("MAILTRAP_SENDEREMAIL:", process.env.MAILTRAP_SENDEREMAIL);

db();

// UserRoutes


app.use('/api/v1/users',userRoutes);

app.get('/varun', (req, res) => {
    res.send('Hello Varun!... Hi Varun')
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})