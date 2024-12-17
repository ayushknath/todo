import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import AuthUI from "./components/AuthUI.jsx";
import {
  auth,
  googleProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  db,
  collection,
  getDocs,
  doc,
  setDoc,
} from "./firebase/firebase.js";
import "./App.css";

function App() {
  const todoTemplate = { tasks: [], completed: [] };
  const [isAuthUIShown, setIsAuthUIShown] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [todoObj, setTodoObj] = useState({ ...todoTemplate });

  useEffect(() => {
    const unSubAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserData({ ...user });
        setIsUserSignedIn(true);
        try {
          setLoading(true);
          const collectionRef = collection(db, user.uid);
          const snapshot = await getDocs(collectionRef);
          setLoading(false);
          let data = snapshot.docs[0].data();
          Object.keys(data).length > 0 && setTodoObj(data);
        } catch (error) {
          console.error(error.message);
        }
      } else {
        setUserData(user);
        setIsUserSignedIn(false);
        setTodoObj({ ...todoTemplate });
      }
    });

    return () => {
      unSubAuth();
    };
  }, []);

  useEffect(() => {
    async function uploadTodo() {
      try {
        const docRef = doc(db, userData.uid, "todos");
        await setDoc(docRef, {
          tasks: [...todoObj.tasks],
          completed: [...todoObj.completed],
        });
      } catch (error) {
        console.error(error.message);
      }
    }
    if (userData) uploadTodo();
  }, [todoObj]);

  function handleAuthUI() {
    if (!isAuthUIShown) setIsAuthUIShown(true);
    else setIsAuthUIShown(false);
  }

  async function handleGoogleAuth() {
    try {
      console.log("google signin");
      await signInWithPopup(auth, googleProvider);
      console.log("user signed in with google");
      if (isAuthUIShown) setIsAuthUIShown(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleSignout() {
    try {
      console.log("signing out");
      await signOut(auth);
      console.log("user signed out");
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleNewTask(e, taskInput) {
    e.preventDefault();
    taskInput = taskInput.trim();

    if (!taskInput) {
      alert("Provide some task to add");
      return;
    }

    setTodoObj((t) => ({
      ...t,
      tasks: [...t.tasks, { label: taskInput, id: uuidv4() }],
    }));
  }

  function handleTaskCheck(e, setChecked, taskId) {
    setChecked(e.target.checked);
    const todos = { ...todoObj };
    const taskIndex = todos.tasks.findIndex((task) => task.id === taskId);
    const task = todos.tasks.splice(taskIndex, 1)[0];
    todos.completed.push(task);
    setTodoObj({ ...todos });
  }

  function handleTaskUncheck(e, setChecked, taskId) {
    setChecked(e.target.checked);
    const todos = { ...todoObj };
    const taskIndex = todos.completed.findIndex((task) => task.id === taskId);
    const task = todos.completed.splice(taskIndex, 1)[0];
    todos.tasks.push(task);
    setTodoObj({ ...todos });
  }

  function finishEdit(editText, taskId) {
    const todos = { ...todoObj };
    const taskIndex = todos.tasks.findIndex((task) => task.id === taskId);
    todos.tasks[taskIndex].label = editText.trim();
    setTodoObj({ ...todos });
  }

  function deleteTask(taskLocation, taskId) {
    const todos = { ...todoObj };
    let taskIndex;
    switch (taskLocation) {
      case "TASKS":
        taskIndex = todos.tasks.findIndex((task) => task.id === taskId);
        todos.tasks.splice(taskIndex, 1);
        break;
      case "COMPLETED":
        taskIndex = todos.completed.findIndex((task) => task.id === taskId);
        todos.completed.splice(taskIndex, 1);
        break;
      default:
        console.error("invalid task location");
        return;
    }
    setTodoObj({ ...todos });
  }

  return (
    <>
      <Header
        isAuthUIShown={isAuthUIShown}
        isUserSignedIn={isUserSignedIn}
        onClickSignout={handleSignout}
        onClickAuthUI={handleAuthUI}
      />
      <Main
        todoObj={todoObj}
        loading={loading}
        onSubmitNewTask={handleNewTask}
        onChangeTaskCheck={handleTaskCheck}
        onChangeTaskUncheck={handleTaskUncheck}
        finishEdit={finishEdit}
        deleteTask={deleteTask}
      />
      {isAuthUIShown && (
        <AuthUI onClickAuthUI={handleAuthUI} onClickGoogle={handleGoogleAuth} />
      )}
    </>
  );
}

export default App;
