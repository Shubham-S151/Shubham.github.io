// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase and Firestore
let db;
try {
    const app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore(app);
    console.log("Firestore initialized successfully.");
} catch (error) {
    console.error("Error initializing Firestore:", error);
}

// Save changes to Firestore
async function saveChanges() {
    if (!db) {
        alert("Firestore is not initialized. Unable to save changes.");
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
        alert("Firestore is not initialized. Unable to load data.");
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

// Load resume on page load
window.onload = loadResume;
