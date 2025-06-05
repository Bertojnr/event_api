import express from "express";
import { eventRouter } from "./routes/event_routes.js";
import mongoose from "mongoose";
import 'dotenv/config'

const app = express();

const PORT = 7078;


app.use(express.json())
app.use(eventRouter);

const mongoURI = process.env.MONGO_URI;

await mongoose.connect(mongoURI);

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})





