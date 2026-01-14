import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import router from "./routes/routing.js"
import { connectDB } from "./utils/connection.js"

dotenv.config()

const app = express()
app.use(cors({
    origin: ['http://localhost:5173', 'https://commentme-web.vercel.app'],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.json())

app.use("/", router);

const PORT = process.env.PORT || 8080

// Connect to DB then start server
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}).catch(err => {
    console.error("Failed to connect to DB:", err)
});