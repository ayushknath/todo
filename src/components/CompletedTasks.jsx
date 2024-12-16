import { v4 as uuidv4 } from "uuid";
import CompletedTask from "./CompletedTask";

function CompletedTasks({ completed, onChangeTaskUncheck, deleteTask }) {
  const taskList = completed.map((task, idx) => {
    const taskNum = idx + 1;
    return (
      <CompletedTask
        key={uuidv4()}
        task={task}
        taskNum={taskNum}
        onChangeTaskUncheck={onChangeTaskUncheck}
        deleteTask={deleteTask}
      />
    );
  });

  return (
    <section>
      <h2 className="task-section-heading">Completed</h2>
      <ul className="task-holder">
        {taskList.length > 0 ? taskList : "No completed tasks"}
      </ul>
    </section>
  );
}

export default CompletedTasks;
