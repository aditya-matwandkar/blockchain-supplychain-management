import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

async function main(prompt) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result.response.text();
}

app.post("/api/generate", async (req, res) => {
  try {
    const data = req.body.medicine; // This will now correctly receive the medicine name
    if (!data) {
      return res.status(400).json({ error: "Medicine name is required" });
    }

    const prompt = `Generate a concise 20-word description for a ${data} that highlights its benefits, uses, and key features. Keep it informative yet brief.

    Example Description:
    "A pain reliever and fever reducer used for headaches, muscle pain, colds, and flu. Common brands: Tylenol, Panadol.",
    "A diabetes medication that helps control blood sugar levels by improving insulin sensitivity. Common brands: Glucophage, Glumetza."

    Give the description in above format only, do not use any extra words, characters.`;

    let result = await main(prompt);
    result = result.slice(1, -2);
    res.json({ description: result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get("/api/generate", async (req, res) => {
//   try {
//     const data = req.query.medicine; // Read from query instead of req.body
//     if (!data) {
//       return res.status(400).json({ error: "Medicine name is required" });
//     }

//     const prompt = `Generate a concise 20-word description for a ${data} that highlights its benefits, uses, and key features. Keep it informative yet brief.

//     Example Description:
//     "A pain reliever and fever reducer used for headaches, muscle pain, colds, and flu. Common brands: Tylenol, Panadol.",
//     "A diabetes medication that helps control blood sugar levels by improving insulin sensitivity. Common brands: Glucophage, Glumetza."

//     Give the description in above format only, do not use any extra words, characters, double quotes.`;

//     const result = await main(prompt);
//     res.json({ description: result });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
