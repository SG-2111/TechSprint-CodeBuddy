import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// ---- UI Elements ----
const codeArea = document.getElementById("codeArea");
const fileInput = document.getElementById("fileInput");
const outputBox = document.getElementById("output");
const voicePopup = document.getElementById("voicePopup");
const historyList = document.getElementById("historyList");

let isRecordingUI = false;

// ---- Upload code from file ----
function uploadCode() {
  fileInput.click();
}

/*fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    codeArea.value = reader.result;
  };
  reader.readAsText(file);
});*/

// ---- Reset chat ----
function newChat() {
  codeArea.value = "";
  outputBox.innerText = "";
  console.log("New Chat started");
}

// ---- Voice UI toggle (UI only for prototype) ----
function toggleVoice() {
  isRecordingUI = !isRecordingUI;
  voicePopup.style.display = isRecordingUI ? "flex" : "none";
}

// ---- Save code to Firebase Realtime Database ----
function saveCodeToFirebase(code) {
  const codeRef = ref(database, 'codeSubmissions');
  push(codeRef, {
    code: code,
    createdAt: Date.now()
  });
}

// ---- Load code history from Firebase ----
function loadCodeHistory() {
  const codeRef = ref(database, 'codeSubmissions');

  onValue(codeRef, (snapshot) => {
    historyList.innerHTML = "";
    const data = snapshot.val();
    if (!data) return;

    const entries = Object.entries(data);
    entries.sort((a, b) => a[1].createdAt - b[1].createdAt);

    entries.forEach(([key, snippet], index) => {
      const li = document.createElement("li");
      li.textContent = snippet.code.length > 50 ? snippet.code.slice(0, 50) + "..." : snippet.code;
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        codeArea.value = snippet.code;
        outputBox.innerText = `Loaded snippet #${index + 1}`;
      });
      historyList.appendChild(li);
    });
  });
}

// ---- MAIN FUNCTION: Explain Code ----
async function explainCode() {
  const code = codeArea.value.trim();

  if (!code) {
    alert("Please enter some code first");
    return;
  }

  addToHistory(code);
  alert("Code sent for explanation!");

  try {
    // 1️⃣ Save code to Firebase Realtime Database
    saveCodeToFirebase(code);

    // 2️⃣ Send code to backend (mock Gemini for now)
    const res = await fetch("http://localhost:3000/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });

    const data = await res.json();
    outputBox.innerText = data.explanation;

  } catch (error) {
    console.error("❌ Error:", error);
    alert("Something went wrong. Please try again.");
  }
}


// ---- Initialize ----
window.uploadCode = uploadCode;
window.newChat = newChat;
window.toggleVoice = toggleVoice;
window.explainCode = explainCode;

document.getElementById('new-chat-btn')?.addEventListener('click', newChat);

// Load Firebase code history on page load
loadCodeHistory();
