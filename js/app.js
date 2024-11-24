function getTodos() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  return todos ? todos : {tasks:[], completed: []};
}

function storeTodos(todoObj) {
  localStorage.setItem("todos", JSON.stringify(todoObj));
}

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

function finishTask(targetElement) {
  if (targetElement.checked) {
    const label = targetElement.nextElementSibling.textContent;
    const todoItemIdx = todoObj.tasks.findIndex((task) => task.label === label);
    const [todoItem] = todoObj.tasks.splice(todoItemIdx, 1);

    todoItem.isCompleted = true;
    todoObj.completed.push(todoItem);

    storeTodos(todoObj);
    updateUI();
  }
}

function editTask(targetElement) {
  const li = targetElement.parentElement.parentElement;
  const label = li.querySelector(".task-details > label");
  let labelText = label.textContent;
  const input = li.querySelector(".task-details > input[type='text']");

  const taskIdx = todoObj.tasks.findIndex((task) => task.label === labelText);
  const taskItem = todoObj.tasks[taskIdx];
  
  li.classList.add("edit-mode");
  targetElement.disabled = true;
  input.value = labelText;

  input.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
      labelText = input.value;
      li.classList.remove("edit-mode");
      targetElement.disabled = false;

      taskItem.label = labelText;
      todoObj.tasks.splice(taskIdx, 1, taskItem);
      storeTodos(todoObj);
      updateUI();
    }
  });
}

function deleteTask(targetElement) {
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
  updateUI();
}

function reassignTask(targetElement) {
  if (!targetElement.checked) {
    const label = targetElement.nextElementSibling.textContent;
    const todoItemIdx = todoObj.completed.findIndex((task) => task.label === label);
    const [todoItem] = todoObj.completed.splice(todoItemIdx, 1);

    todoItem.isCompleted = false;
    todoObj.tasks.push(todoItem);
    storeTodos(todoObj);
    updateUI();
  }
}

function updateUI() {
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
          finishTask(targetElement);
        }
        else if(targetElement.tagName === "BUTTON" && targetElement.textContent === "Edit") {
          editTask(targetElement);
        }
        else if(targetElement.tagName === "BUTTON" && targetElement.textContent === "Delete") {
          deleteTask(targetElement);
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
          reassignTask(targetElement);
        }
        else if(targetElement.tagName === "BUTTON" && targetElement.textContent === "Delete") {
          deleteTask(targetElement);
        }
      });
      
      completedList.append(completedTaskElement);
    });
  }
}

const todoObj = getTodos();

/* \/ \/ \/ \/ \/ */
if (!todoObj.tasks.length && !todoObj.completed.length) {
  console.log("No tasks");
}
/* /\ /\ /\ /\ /\ */

updateUI();

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
    updateUI();
  } else {
    alert("Nothing to add!");
  }
});