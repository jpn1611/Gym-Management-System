import { db } from '../firebase.js';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const addMemberForm = document.getElementById('add-member-form');
const membersList = document.getElementById('members-list');

// Add Member
addMemberForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('member-name').value;
  const email = document.getElementById('member-email').value;

  try {
    await addDoc(collection(db, 'members'), { name, email });
    console.log("Member added successfully!");
    addMemberForm.reset();
    loadMembers(); // Refresh the members list
  } catch (error) {
    console.error("Error adding member: ", error);
  }
});

// Load Members
const loadMembers = async () => {
  membersList.innerHTML = ''; // Clear the list
  const querySnapshot = await getDocs(collection(db, 'members'));
  querySnapshot.forEach((doc) => {
    const member = doc.data();
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${member.name} - ${member.email}
      <button class="delete-btn" data-id="${doc.id}">Delete</button>
      <button class="edit-btn" data-id="${doc.id}">Edit</button>
    `;
    membersList.appendChild(listItem);
  });

  // Attach event listeners to delete buttons
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => deleteMember(button.dataset.id));
  });

  // Attach event listeners to edit buttons
  const editButtons = document.querySelectorAll('.edit-btn');
  editButtons.forEach((button) => {
    button.addEventListener('click', () => editMember(button.dataset.id));
  });
};

// Delete Member
const deleteMember = async (id) => {
  await deleteDoc(doc(db, 'members', id));
  loadMembers(); // Refresh the list
};

// Edit Member
const editMember = async (id) => {
  const newName = prompt("Enter new name:");
  if (newName) {
    await updateDoc(doc(db, 'members', id), { name: newName });
    loadMembers(); // Refresh the list
  }
};

// Load members on page load
loadMembers();