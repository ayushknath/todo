import { updateUI } from "./ui.js";
import { storeTodos } from "./todoStorage.js";

function finishTask(targetElement, todoObj) {
  if (targetElement.checked) {
    const label = targetElement.nextElementSibling.textContent;
    const todoItemIdx = todoObj.tasks.findIndex((task) => task.label === label);
    const [todoItem] = todoObj.tasks.splice(todoItemIdx, 1);

    todoItem.isCompleted = true;
    todoObj.completed.push(todoItem);

    storeTodos(todoObj);
    updateUI(todoObj);
  }
}

function editTask(targetElement, todoObj) {
  const li = targetElement.parentElement.parentElement;
  const label = li.querySelector(".task-details > label");
  let labelText = label.textContent;
  const input = li.querySelector(".task-details > input[type='text']");

  const taskIdx = todoObj.tasks.findIndex((task) => task.label === labelText);
  const taskItem = todoObj.tasks[taskIdx];
  
  li.classList.add("edit-mode");
  targetElement.disabled = true;
  input.value = labelText;

  input.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
      labelText = input.value.trim();
      li.classList.remove("edit-mode");
      targetElement.disabled = false;

      if(labelText.length) {
        taskItem.label = labelText;
        todoObj.tasks.splice(taskIdx, 1, taskItem);
        storeTodos(todoObj);
        updateUI(todoObj);
      }
    } else if(e.key === "Escape") {
      li.classList.remove("edit-mode");
      targetElement.disabled = false;
      return;
    }
  });
}

function deleteTask(targetElement, todoObj) {
  const category = targetElement.parentElement.parentElement.parentElement.previousElementSibling.textContent;
  const labelText = targetElement.parentElement.previousElementSibling.querySelector("label").textContent;
  let todoIdx;

  if(category === "Tasks") {
    todoIdx = todoObj.tasks.findIndex((task) => task.label === labelText);
    todoObj.tasks.splice(todoIdx, 1);
  } else if(category === "Completed") {
    todoIdx = todoObj.completed.findIndex((task) => task.label === labelText);
    todoObj.completed.splice(todoIdx, 1);
  }
  
  storeTodos(todoObj);
  updateUI(todoObj);
}

function reassignTask(targetElement, todoObj) {
  if (!targetElement.checked) {
    const label = targetElement.nextElementSibling.textContent;
    const todoItemIdx = todoObj.completed.findIndex((task) => task.label === label);
    const [todoItem] = todoObj.completed.splice(todoItemIdx, 1);

    todoItem.isCompleted = false;
    todoObj.tasks.push(todoItem);
    storeTodos(todoObj);
    updateUI(todoObj);
  }
}

export { finishTask, editTask, deleteTask, reassignTask };