import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import router from "./routes/routing.js"
import { connectDB } from "./utils/connection.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use("/", router);

const PORT = process.env.PORT || 8000

// Connect to DB then start server
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}).catch(err => {
    console.error("Failed to connect to DB:", err)
});