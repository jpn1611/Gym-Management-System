import { db } from '../firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Search Records
searchInput.addEventListener('input', async (e) => {
  const searchTerm = e.target.value.toLowerCase();
  searchResults.innerHTML = ''; // Clear the list

  const querySnapshot = await getDocs(collection(db, 'members'));
  querySnapshot.forEach((doc) => {
    const member = doc.data();
    if (member.name.toLowerCase().includes(searchTerm)) {
      searchResults.innerHTML += `<li>${member.name} - ${member.email}</li>`;
    }
  });
});