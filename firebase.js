// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAorF-py1NmSGAsUR7pvi-VxJSlSvJaobQ",
  authDomain: "nours-notes.firebaseapp.com",
  projectId: "nours-notes",
  storageBucket: "nours-notes.appspot.com",
  messagingSenderId: "568524849958",
  appId: "1:568524849958:web:8c51a6dc036fd1b995b7e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const notesCollection = collection(db, "notes")

export {
  notesCollection,
  db
}
