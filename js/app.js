import { getTodos, storeTodos } from "./todoStorage.js";
import { updateUI } from "./ui.js";

const todoObj = getTodos();

/* \/ \/ \/ \/ \/ */
if (!todoObj.tasks.length && !todoObj.completed.length) {
  console.log("No tasks");
}
/* /\ /\ /\ /\ /\ */

updateUI(todoObj);

const taskAddForm = document.querySelector("main > section:first-child form");
taskAddForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskVal = document.getElementById("add-task").value;
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