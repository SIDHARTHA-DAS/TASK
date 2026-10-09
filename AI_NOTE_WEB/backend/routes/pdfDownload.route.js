import express from "express"
import isAuth from "../middleware/isAuth.js"
import { pdfDownload } from "../controllers/pdf.controller.js"


// pdf download route
const pdfRouter = express.Router()


pdfRouter.post("/generate-pdf", isAuth, pdfDownload)

export default pdfRouter