import { useState, useEffect } from "react";

function Task({ task, taskNum, onChangeTaskCheck, finishEdit, deleteTask }) {
  const [checked, setChecked] = useState(false);
  const [editText, setEditText] = useState(task.label);
  const [beingEdited, setBeingEdited] = useState(false);

  useEffect(() => {
    if (beingEdited) setEditText(task.label);
  }, [beingEdited]);

  function handleEdit() {
    setBeingEdited(true);
  }

  function handleDelete() {
    deleteTask("TASKS", task.id);
  }

  function handleEditChange(e) {
    setEditText(e.target.value);
  }

  function saveEditedTask() {
    setBeingEdited(false);
    finishEdit(editText, task.id);
  }

  function discardEditedText() {
    setBeingEdited(false);
  }

  return (
    <li className={beingEdited ? "edit-mode" : ""}>
      <div className="task-details">
        <input
          id={`task-${taskNum}`}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChangeTaskCheck(e, setChecked, task.id)}
        />
        <label htmlFor={`task-${taskNum}`}>{task.label}</label>
        {beingEdited && (
          <input
            type="text"
            name="edit-text"
            value={editText}
            onChange={handleEditChange}
          />
        )}
      </div>
      <div className="action-buttons">
        <button onClick={beingEdited ? saveEditedTask : handleEdit}>
          {beingEdited ? "Save" : "Edit"}
        </button>
        <button onClick={beingEdited ? discardEditedText : handleDelete}>
          {beingEdited ? "Discard" : "Delete"}
        </button>
      </div>
    </li>
  );
}

export default Task;
