import { useState } from "react";

function CompletedTask({ task, taskNum, onChangeTaskUncheck, deleteTask }) {
  const [checked, setChecked] = useState(true);

  function handleDelete() {
    deleteTask("COMPLETED", task.id);
  }

  return (
    <li>
      <div className="task-details">
        <input
          id={`completed-task-${taskNum}`}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChangeTaskUncheck(e, setChecked, task.id)}
        />
        <label htmlFor={`completed-task-${taskNum}`}>
          <del>{task.label}</del>
        </label>
      </div>
      <div className="action-buttons">
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
}

export default CompletedTask;
