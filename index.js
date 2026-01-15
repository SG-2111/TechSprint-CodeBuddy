require('dotenv').config({ path: './code.env' });
const projectId = process.env.FIREBASE_PROJECT_ID;


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
    console.error("FIREBASE CRASH:", err); 
    res.status(500).json({ error: err.message });
    /*console.log("Firebase Error: ", err);
    res.status(500).json({error: "Error in saving it in firestore"});*/
   }
});

app.get("/history", async (req, res) => {
  try {
    const snapshot = await db.collection("sessions").orderBy("createdAt", "asc").get();
    let history = {};
    snapshot.forEach(doc => {
      history[doc.id] = doc.data();
    });
    res.json(history);
  } catch (err) {
    console.error("History Error:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

app.listen(3000, () => {
  console.log("CodeBuddy Backend running on http://localhost:3000");
});
