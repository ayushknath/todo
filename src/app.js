import { getTodos, storeTodos } from "./todoStorage.js";
import { updateUI } from "./ui.js";
import { auth, onAuthStateChanged } from "./firebase.js";

let todoObj;
const taskAddForm = document.querySelector("main > section:first-child form");

taskAddForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskVal = document.getElementById("add-task").value.trim();
  if (taskVal) {
    todoObj.tasks.push({
      label: taskVal,
      isCompleted: false,
    });

    document.getElementById("add-task").value = "";

    storeTodos(todoObj);
    updateUI(todoObj);
  } else {
    alert("Nothing to add!");
  }
});

const unsubAuth = onAuthStateChanged(auth, async (user) => {
  try {
    const data = await getTodos();

    todoObj = { ...data };

    /* \/ \/ \/ \/ \/ */
    if (!todoObj.tasks.length && !todoObj.completed.length)
      console.log("No tasks");
    /* /\ /\ /\ /\ /\ */

    updateUI(todoObj);
  } catch (error) {
    console.error(`onAuthStateChanged: ${error.message}`);
  }
});
