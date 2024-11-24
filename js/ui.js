import { finishTask, editTask, deleteTask, reassignTask } from "./taskActions.js";

function createTaskElement(taskNumber, taskLabel, isCompleted = false) {
  const li = document.createElement("li");
  li.innerHTML = `
    <div class="task-details">
      <input id="${isCompleted ? "completed-" : ""}task-${taskNumber}" type="checkbox" ${isCompleted ? "checked" : ""} />
      <label for="${isCompleted ? "completed-" : ""}task-${taskNumber}">${isCompleted ? `<del>${taskLabel}</del>` : taskLabel}</label>
      <input type="text" />
    </div>
    <div class="action-buttons">
      ${isCompleted ? "" : "<button>Edit</button>"}
      <button>Delete</button>
    </div>        
  `;
  return li;
}

function updateUI(todoObj) {
  const taskList = document.querySelector(".task-list");
  const completedList = document.querySelector(".completed-list");

  while(taskList.firstElementChild || completedList.firstElementChild) {
    if(taskList.firstElementChild) {
      taskList.firstElementChild.remove();
    } 

    if(completedList.firstElementChild) {
      completedList.firstElementChild.remove();
    }
  }

  if(todoObj.tasks.length) {
    todoObj.tasks.forEach((task, idx) => {
      const taskNum = idx + 1;
      const newTaskElement = createTaskElement(taskNum, task.label);

      newTaskElement.addEventListener("click", (e) => {
        const targetElement = e.target;

        if(targetElement.tagName === "INPUT" && targetElement.getAttribute("type") === "checkbox") {
          finishTask(targetElement, todoObj);
        }
        else if(targetElement.tagName === "BUTTON" && targetElement.textContent === "Edit") {
          editTask(targetElement, todoObj);
        }
        else if(targetElement.tagName === "BUTTON" && targetElement.textContent === "Delete") {
          deleteTask(targetElement, todoObj);
        }
      });
      
      taskList.append(newTaskElement);
    });
  }

  if(todoObj.completed.length) {
    todoObj.completed.forEach((task, idx) => {
      const taskNum = idx + 1;
      const completedTaskElement = createTaskElement(taskNum, task.label, true);

      completedTaskElement.addEventListener("click", (e) => {
        const targetElement = e.target;

        if(targetElement.tagName === "INPUT" && targetElement.getAttribute("type") === "checkbox") {
          reassignTask(targetElement, todoObj);
        }
        else if(targetElement.tagName === "BUTTON" && targetElement.textContent === "Delete") {
          deleteTask(targetElement, todoObj);
        }
      });
      
      completedList.append(completedTaskElement);
    });
  }
}

export { createTaskElement, updateUI };