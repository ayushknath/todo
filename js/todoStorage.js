import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db, onAuthStateChanged } from "./firebase.js";

function getUser() {
  return new Promise((resolve, reject) => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) resolve({ ...user });
      else reject(new Error("user signed out"));

      unsubAuth();
    });
  });
}

async function getTodos() {
  const todoObjTemplate = {
    tasks: [],
    completed: [],
  };

  try {
    const userData = await getUser();
    const collectionRef = collection(db, userData.uid);
    const snapshot = await getDocs(collectionRef);

    if (snapshot.docs.length > 0) return snapshot.docs[0].data();
  } catch (error) {
    console.error(`def getTodos: ${error.message}`);
  }

  return { ...todoObjTemplate };
}

async function storeTodos(todoObj) {
  console.log("storing in firebase");
  try {
    const userData = await getUser();
    const docRef = doc(db, userData.uid, "todos");
    await setDoc(docRef, {
      tasks: [...todoObj.tasks],
      completed: [...todoObj.completed],
    });
  } catch (error) {
    console.error(`def storeTodos: ${error.message}`);
  }
}

export { getTodos, storeTodos };
