import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { app } from "./firebase-config.js";

const auth = getAuth(app);
signInAnonymously(auth);
