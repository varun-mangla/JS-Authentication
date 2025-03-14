import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js";

dotenv.config()

const app = express()

app.use(cors({
  origin:process.env.BASE_URL,
  credentials:true,
  methods:['GET','POST','DELETE','OPTIONS'],
  allowedHeaders:['Content-Type','Authorization']
}));

const port = process.env.PORT||4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

db();

app.get('/varun', (req, res) => {
    res.send('Hello Varun!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})