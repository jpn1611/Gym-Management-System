import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logged in as:", user.email);
      window.location.href = "dashboard.html"; // Redirect to dashboard
    })
    .catch((error) => {
      console.error("Error code:", error.code); // Log the error code
      console.error("Error message:", error.message); // Log the error message
      errorMessage.textContent = error.message; // Display the error to the user
    });
});