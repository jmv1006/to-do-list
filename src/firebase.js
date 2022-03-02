// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, setDoc, addDoc } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALzEs1zFpw8w1UGlZ_M5c8M-VkXzzeQV4",
  authDomain: "noteit-fb855.firebaseapp.com",
  projectId: "noteit-fb855",
  storageBucket: "noteit-fb855.appspot.com",
  messagingSenderId: "1076200852323",
  appId: "1:1076200852323:web:25e9dbde9b60374bc56156",
  measurementId: "G-GH7HHPZQ2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

async function getProjects(db) {
    const projectsCol = collection(db, 'Projects');
    const projects = await getDocs(projectsCol);
    const projectList = projects.docs.map(projectArr => projectArr.data())
    return projectList;
}

async function addProjectToDB(project) {
  let name = project.name;
  let number = project.number;
  let todos = project.todos;
  const docRef = await addDoc(collection(db, 'Projects'), {
      obj: {
        name,
        number,
        todos
      }
  });
};

async function updateProjectInDB(project) {
  console.log(project)
  /*
    const projectsCol = collection(db, 'Projects');
    const projects = await getDocs(projectsCol);
    const projectList = projects.docs.map(projectArr => projectArr.data())
    */
}


export {db, getProjects, addProjectToDB, updateProjectInDB};