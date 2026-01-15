</> CodeBuddy </>

-> CodeBuddy is a beginner-friendly coding assistant designed to help new programmers understand compiler errors and technical concepts in simple, human-readable language.

> ⚠️ Note: This project prioritizes security and reproducibility. Some features require local execution with personal API keys.


🚨 Note:  
    For full functionality—especially features relying on external services such as Firebase—local execution is recommended.


❓Problem Statement
  While learning programming, beginners often struggle to understand technical jargon and cryptic compiler or runtime errors. Many existing platforms assume prior knowledge, which leads to confusion, excessive debugging time, and eventually discouragement from learning programming altogether.


✅ Solution
  CodeBuddy aims to reduce this learning barrier by providing simplified explanations and guidance tailored for beginners. Instead of overwhelming users with complex terminology, the application focuses on clarity and approachability, helping learners understand *why* an error occurs and *how* to resolve it.


✨ Key Features

- Beginner-friendly explanations of errors and concepts  
- Clean and minimal user interface  
- Firebase-based backend for data handling  

🧩 Tech Stack

- Frontend: HTML, CSS, JavaScript  
- Backend / Services: Firebase (Realtime Database, Firestore Database)
  

⚙️ Local Setup & Usage (Recommended for Full Access)

  Some features are configured to work in a local development environment.

  Steps to Run Locally

  1. Clone this repository  
  2. Open the project using a local server (e.g., Live Server)  
  3. Configure Firebase credentials (see below)  
  4. Access the project via `localhost`


  Firebase / API Configuration

  🔐 Important Note on API Keys

   For security reasons, Firebase API keys and configuration details are not included in this repository.
   
   To run this project locally, reviewers will need to:

   1. Create their own Firebase project  
   2. Enable the required services (Authentication / Realtime Database)  
   3. Add their own Firebase configuration inside `firebase-config.js`
     
      The `firebase-config.js` file is intentionally excluded or contains placeholder values to prevent exposure of sensitive credentials.
      This follows standard security best practices.

      Example for `firebase-config.js` file (Required to enter their app values -> available in Firebase (when creating an app))

      *export const firebaseConfig = {
        apiKey: "YOUR_FIREBASE_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
        measurementId: "YOUR_MEASUREMENT_ID" // optional
      };*


📝 Notes for Reviewers / Judges
  
- Full functionality is available when running the project locally via `localhost`.  
- Features using external services (Firebase) require reviewers to use their own API keys.  
- API keys are intentionally excluded to ensure security.  
- No sensitive credentials are exposed in this public repository.


🔧 Future Improvements

- Full public deployment with environment-based configuration  
- Enhanced error explanation engine  
