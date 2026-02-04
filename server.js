import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenerativeAI(process.env.GEMINI_KEY);

app.post("/ask", async (req, res) => {
  const model = ai.getGenerativeModel({ model: "gemini-pro" });
  const r = await model.generateContent(req.body.q);
  res.json({ a: r.response.text() });
});

app.listen(3000);
