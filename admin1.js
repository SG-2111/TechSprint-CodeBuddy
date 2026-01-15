require('dotenv').config({ path: './code.env' });
const projectId = process.env.FB_PROJECT_ID;

const admin = require('firebase-admin');

// Load values from .env
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FB_PROJECT_ID,
    clientEmail: process.env.FB_CLIENT_EMAIL,
    privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  databaseURL:process.env.FB_DATABASE_URL
});

module.exports = admin;
