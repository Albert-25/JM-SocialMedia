import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./src/routes/posts.js"

const app = express();

app.use(cors());
app.use("/posts", postRoutes)


const CONNECTION_URL = "mongodb+srv://AlbertJM:python@cluster0.s8uxibm.mongodb.net/?retryWrites=true&w=majority";
const PORT = 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`server running on port: ${PORT}`) }))
    .catch((error) => console.log(`This is the error why your app is not working: ${error.message}`));


