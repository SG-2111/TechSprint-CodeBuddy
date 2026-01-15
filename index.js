require('dotenv').config({ path: './code.env' });



const express = require("express");
const admin = require("./admin1");
const cors = require("cors");

const app = express();
const apiKey = process.env.FIREBASE_API_KEY;

app.use(cors());
app.use(express.json());

const db = admin.firestore();

app.post("/explain", async (req, res) => {
  const { code } = req.body;

  // MOCK AI for now
  const explanation = `Line-by-line explanation for:\n${code}`;

  try {
    await db.collection("sessions").add({
      code,
      explanation,
      createdAt: new Date()
    });
    res.json({ explanation });
  } catch (err) {
    console.log("Firebase Error: ", err);
    res.status(500).json({error: "Error in saving it in firestore"});
   }
});

app.listen(3000, () => {
  console.log("CodeBuddy Backend running on http://localhost:3000");
});
