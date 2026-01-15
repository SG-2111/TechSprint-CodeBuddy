
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


// ---- Load code history from Firebase (accessing backend) ----
async function loadCodeHistory() {
  const res = await fetch("http://localhost:3000/history");
  const data = await res.json();

  historyList.innerHTML = "";
  if (!data) return;

  const entries = Object.entries(data);
  entries.sort((a, b) => a[1].createdAt - b[1].createdAt);

  entries.forEach(([key, snippet], index) => {
    if (snippet && snippet.code) {
      const li = document.createElement("li");
      li.textContent = snippet.code.length > 50 ? snippet.code.slice(0, 50) + "..." : snippet.code;
      li.style.cursor = "pointer";
      li.addEventListener("click", () => {
        codeArea.value = snippet.code;
        outputBox.innerText = `Loaded snippet #${index + 1}`;
      });
    historyList.appendChild(li);
    }
  });
}

// ---- MAIN FUNCTION: Explain Code ----
async function explainCode() {
  const code = codeArea.value.trim();

  if (!code) {
    alert("Please enter some code first");
    return;
  }

  // addToHistory(code); // Keeping your logic
  alert("Code sent for explanation!");

  try {

    // Code to backend for Gemini explanation
    const res = await fetch("http://localhost:3000/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });

    const data = await res.json();
    outputBox.innerText = data.explanation;

    loadCodeHistory();

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
