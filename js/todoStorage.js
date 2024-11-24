function getTodos() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  return todos ? todos : {tasks:[], completed: []};
}

function storeTodos(todoObj) {
  localStorage.setItem("todos", JSON.stringify(todoObj));
}

export { getTodos, storeTodos };