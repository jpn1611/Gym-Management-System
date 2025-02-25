import { db } from '../firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const billsList = document.getElementById('bills-list');
const notificationsList = document.getElementById('notifications-list');

// Load Bills
const loadBills = async () => {
  console.log("Loading bills...");
  billsList.innerHTML = ''; // Clear the list
  try {
    const querySnapshot = await getDocs(collection(db, 'bills'));
    console.log("Bills data:", querySnapshot.docs);
    querySnapshot.forEach((doc) => {
      const bill = doc.data();
      console.log("Bill:", bill);
      billsList.innerHTML += `<li>${bill.description} - $${bill.amount}</li>`;
    });
  } catch (error) {
    console.error("Error loading bills:", error);
  }
};

// Load Notifications
const loadNotifications = async () => {
  console.log("Loading notifications...");
  notificationsList.innerHTML = ''; // Clear the list
  try {
    const querySnapshot = await getDocs(collection(db, 'notifications'));
    console.log("Notifications data:", querySnapshot.docs);
    if (querySnapshot.empty) {
      console.log("No notifications found.");
      notificationsList.innerHTML = "<li>No notifications found.</li>"; // Display a message
    } else {
      querySnapshot.forEach((doc) => {
        const notification = doc.data();
        console.log("Notification:", notification);
        notificationsList.innerHTML += `<li>${notification.text}</li>`;
      });
    }
  } catch (error) {
    console.error("Error loading notifications:", error);
    notificationsList.innerHTML = "<li>Error loading notifications.</li>"; // Display an error message
  }
};

// Load data on page load
loadBills();
loadNotifications();