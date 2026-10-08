// import express from "express";
// import dotenv from "dotenv";
// import connectDb from "./utils/connectDB.js";
// import authRouter from "./routes/auth.route.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import userRouter from "./routes/user.route.js";
// import notesRouter from "./routes/generate.route.js";
// import pdfRouter from "./routes/pdfDownload.route.js";
// import creditRouter from "./routes/credits.route.js";
// import { stripeWebhook } from "./controllers/credits.controller.js";
// dotenv.config();

// const app = express();

// app.post(
//   "/api/credits/webhook",
//   express.raw({ type: "application/json" }),
//   stripeWebhook,
// );

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   }),
// );

// app.use(express.json());
// app.use(cookieParser());
// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.json({ message: "exam note ruuning" });
// });

// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.use("/api/notes", notesRouter);
// app.use("/api/pdf", pdfRouter);
// app.use("/api/credit", creditRouter);

// app.listen(PORT, () => {
//   console.log(`server running on port ${PORT}`);
//   connectDb();
// });



import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDb from "./utils/connectDB.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.route.js";
import pdfRouter from "./routes/pdfDownload.route.js";
import creditRouter from "./routes/credits.route.js";
import { stripeWebhook } from "./controllers/credits.controller.js";

dotenv.config();

const app = express();

// Stripe Webhook ko express.json() se pehle define karna mandatory hai (Raw Body ke liye)
app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// Global Middlewares
app.use(
  cors({
    origin:"https://task-ai-notes-client.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Exam Note API Running" });
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/credit", creditRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
