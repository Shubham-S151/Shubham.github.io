// Load environment variables (for Node.js or build environments)
if (typeof process !== "undefined" && process.env) {
    require('dotenv').config();
}

// Firebase Configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "YOUR_API_KEY_HERE",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN_HERE",
    projectId: process.env.FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID_HERE",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET_HERE",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID_HERE",
    appId: process.env.FIREBASE_APP_ID || "YOUR_APP_ID_HERE",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID_HERE",
};

// Initialize Firebase
let app, db;
try {
    app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore(app);
    console.log("Firebase initialized successfully.");
} catch (error) {
    console.error("Error initializing Firebase:", error);
}

// Save changes to Firestore
async function saveChanges() {
    if (!db) {
        alert("Firestore is not initialized.");
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
        alert("Firestore is not initialized.");
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
    const adminPassword = "your_secure_password"; // Replace with your secure admin password

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
