import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBdLsYomL6CiaUSytE2Hi7_zkjsOZBNzvI",
  authDomain: "gym-management-system-d6865.firebaseapp.com",
  projectId: "gym-management-system-d6865",
  storageBucket: "gym-management-system-d6865.firebasestorage.app",
  messagingSenderId: "569378228792",
  appId: "1:569378228792:web:f93868efc499f67687b4cd",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };