import express from "express"
import { sendMessage } from "../controller/chat.controller.js"
import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router()

router.post("/message", upload.single("file"), sendMessage)

export default router