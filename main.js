// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH16SRIltgfeoXUrhf7Kv1B2EUxdUhef4",
  authDomain: "my-portfolio-d8e23.firebaseapp.com",
  projectId: "my-portfolio-d8e23",
  storageBucket: "my-portfolio-d8e23.appspot.com",
  messagingSenderId: "376908991589",
  appId: "1:376908991589:web:55820b6658c0be8efcca8c",
  measurementId: "G-VJWJXEB9CP"
};

// Initialize Firebase
console.log("Initializing Firebase...");
let app;
try {
  app = firebase.initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully.");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// Initialize Firestore
let db;
try {
  db = firebase.firestore(app);
  console.log("Firestore initialized successfully:", db);
} catch (error) {
  console.error("Firestore initialization error:", error);
}

// Save changes to Firestore
async function saveChanges() {
  if (!db) {
      console.error("Firestore is not initialized.");
      alert("Failed to save changes: Firestore is not initialized.");
      return;
  }

  const htmlContent = document.documentElement.outerHTML;
  try {
      await db.collection("resume").doc("currentVersion").set({
          html: htmlContent,
      });
      alert("Changes saved successfully to Firebase!");
  } catch (error) {
      console.error("Error saving changes:", error);
      alert(`Failed to save changes: ${error.message}`);
  }
}

// Load resume from Firestore
async function loadResume() {
  if (!db) {
      console.error("Firestore is not initialized.");
      alert("Failed to load resume: Firestore is not initialized.");
      return;
  }

  try {
      const doc = await db.collection("resume").doc("currentVersion").get();
      if (doc.exists) {
          document.documentElement.innerHTML = doc.data().html;
      } else {
          console.log("No resume found in Firestore.");
      }
  } catch (error) {
      console.error("Error loading resume:", error);
  }
}

// Add a new project
function addProject() {
  const projectsSection = document.getElementById("projects");
  const newProject = document.createElement("div");
  newProject.className = "project";
  newProject.innerHTML = `
      <h3>New Project</h3>
      <ul>
          <li>Project detail 1</li>
          <li>Project detail 2</li>
      </ul>
  `;
  projectsSection.appendChild(newProject);
}

// Remove the last project
function removeProject() {
  const projectsSection = document.getElementById("projects");
  const projects = projectsSection.getElementsByClassName("project");
  if (projects.length > 0) {
      projectsSection.removeChild(projects[projects.length - 1]);
  } else {
      alert("No projects to remove.");
  }
}

// Authenticate Admin Login
function authenticate() {
  const password = prompt("Enter Admin Password:");
  const adminPassword = "your_secure_password"; // Set your admin password here

  if (password === adminPassword) {
      document.querySelectorAll(".editable").forEach(el => el.contentEditable = "true");
      document.getElementById("save-button").style.display = "block";
      alert("Admin Mode Enabled! You can now edit the content.");
  } else {
      alert("Incorrect Password. Access Denied.");
  }
}

// Load resume on page load
window.onload = () => {
  console.log("Page loaded. Attempting to load resume...");
  loadResume();
};
