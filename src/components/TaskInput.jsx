import { useState } from "react";

function TaskInput({ onSubmitNewTask }) {
  const [taskInput, setTaskInput] = useState("");

  function handleTaskInput(e) {
    setTaskInput(e.target.value);
  }

  function handleSubmit(e) {
    onSubmitNewTask(e, taskInput);
    setTaskInput("");
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="add-task" className="sr-only">
          Add task
        </label>
        <input
          id="add-task"
          type="text"
          placeholder="Add task"
          value={taskInput}
          onChange={handleTaskInput}
        />
        <button className="task-add-btn" type="submit">
          Add
        </button>
      </form>
    </section>
  );
}

export default TaskInput;
