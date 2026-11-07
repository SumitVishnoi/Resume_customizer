import express from "express"
import router from "./routes/chat.routes.js"

const app = express()
app.use(express.json())

app.use("/api/chat", router)

export default app