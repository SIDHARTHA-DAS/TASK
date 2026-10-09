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

// Allowed origins for CORS (Local + Deployed)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://task-ai-notes-client.onrender.com",
  process.env.CLIENT_URL,
].filter(Boolean);

// CORS Config (express.json se pehle hona chahiye)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow non-browser requests (like Stripe webhooks, Postman) or matching origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ⚠️ Stripe Webhook MUST come BEFORE express.json()
app.post(
  "/api/credit/webhook", // Route matched with /api/credit path
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// Global Body Parsing Middlewares
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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});



// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// import connectDb from "./utils/connectDB.js";
// import authRouter from "./routes/auth.route.js";
// import userRouter from "./routes/user.route.js";
// import notesRouter from "./routes/generate.route.js";
// import pdfRouter from "./routes/pdfDownload.route.js";
// import creditRouter from "./routes/credits.route.js";
// import { stripeWebhook } from "./controllers/credits.controller.js";

// dotenv.config();

// const app = express();

// // Stripe Webhook ko express.json() se pehle define karna mandatory hai 
// app.post(
//   "/api/credits/webhook",
//   express.raw({ type: "application/json" }),
//   stripeWebhook
// );

// // Global Middlewares
// app.use(
//   cors({
//     origin:"https://task-ai-notes-client.onrender.com",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// const PORT = process.env.PORT || 8000;

// // Test Route
// app.get("/", (req, res) => {
//   res.json({ message: "Exam Note API Running" });
// });

// // API Routes
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.use("/api/notes", notesRouter);
// app.use("/api/pdf", pdfRouter);
// app.use("/api/credit", creditRouter);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   connectDb();
// });
