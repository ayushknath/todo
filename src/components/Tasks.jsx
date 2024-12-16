import { v4 as uuidv4 } from "uuid";
import Task from "./Task.jsx";

function Tasks({ tasks, onChangeTaskCheck, finishEdit, deleteTask }) {
  const taskList = tasks.map((task, idx) => {
    const taskNum = idx + 1;
    return (
      <Task
        key={uuidv4()}
        task={task}
        taskNum={taskNum}
        onChangeTaskCheck={onChangeTaskCheck}
        finishEdit={finishEdit}
        deleteTask={deleteTask}
      />
    );
  });

  return (
    <section>
      <h2 className="task-section-heading">Tasks</h2>
      <ul className="task-holder">
        {taskList.length > 0 ? taskList : "No tasks"}
      </ul>
    </section>
  );
}

export default Tasks;
