// Firebase configuration (replace with your actual Firebase credentials)
const firebaseConfig = {
  apiKey: "AIzaSyAjeMw1Qns3GncKrwFU1ZKJJklVCcUTovo",
  authDomain: "sjprep-science-olympiad.firebaseapp.com",
  projectId: "sjprep-science-olympiad",
  storageBucket: "sjprep-science-olympiad.firebasestorage.app",
  messagingSenderId: "292163575143",
  appId: "1:292163575143:web:494033b69347065cd963c2"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login functionality
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href = 'dashboard.html'; // Redirect to dashboard after login
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
});

// Save data functionality
document.getElementById('save-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const dataInput = document.getElementById('data-input').value;

  try {
    const user = auth.currentUser;
    if (user) {
      await db.collection('users').doc(user.uid).collection('data').add({
        data: dataInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      document.getElementById('data-input').value = '';  // Clear input field
      loadData(); // Reload saved data
    }
  } catch (error) {
    alert('Error saving data: ' + error.message);
  }
});

// Load saved data
async function loadData() {
  const user = auth.currentUser;
  if (user) {
    const snapshot = await db.collection('users').doc(user.uid).collection('data').get();
    const dataList = document.getElementById('saved-data');
    dataList.innerHTML = '';  // Clear current list
    snapshot.forEach(doc => {
      const li = document.createElement('li');
      li.textContent = doc.data().data;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteData(doc.id);
      li.appendChild(deleteButton);
      dataList.appendChild(li);
    });
  }
}

// Delete data functionality
async function deleteData(docId) {
  const user = auth.currentUser;
  if (user) {
    try {
      await db.collection('users').doc(user.uid).collection('data').doc(docId).delete();
      loadData(); // Reload saved data
    } catch (error) {
      alert('Error deleting data: ' + error.message);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
    loadRoster();
    loadEvents();
    loadSchedule();
});

function addMember() {
    let name = prompt("Enter member name:");
    let grade = prompt("Enter grade:");
    let events = prompt("Enter assigned events:");
    if (name && grade && events) {
        let row = document.getElementById("rosterTable").insertRow();
        row.insertCell(0).innerText = name;
        row.insertCell(1).innerText = grade;
        row.insertCell(2).innerText = events;
        saveRoster();
    }
}

function saveRoster() {
    localStorage.setItem("roster", document.getElementById("rosterTable").innerHTML);
}

function loadRoster() {
    if (localStorage.getItem("roster")) {
        document.getElementById("rosterTable").innerHTML = localStorage.getItem("roster");
    }
}

function assignEvent() {
    let event = prompt("Enter event name:");
    if (event) {
        let li = document.createElement("li");
        li.innerText = event;
        document.getElementById("eventList").appendChild(li);
    }
}

function addScheduleItem() {
    let scheduleItem = prompt("Enter schedule event:");
    if (scheduleItem) {
        let li = document.createElement("li");
        li.innerText = scheduleItem;
        document.getElementById("scheduleList").appendChild(li);
    }
}

function addResource() {
    let resourceName = prompt("Enter resource name:");
    let resourceLink = prompt("Enter resource URL:");
    if (resourceName && resourceLink) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = resourceLink;
        a.innerText = resourceName;
        li.appendChild(a);
        document.getElementById("resourceList").appendChild(li);
    }
}

