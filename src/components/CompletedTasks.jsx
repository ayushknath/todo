import { v4 as uuidv4 } from "uuid";
import CompletedTask from "./CompletedTask";
import Loader from "./Loader.jsx";

function CompletedTasks({
  loading,
  completed,
  onChangeTaskUncheck,
  deleteTask,
}) {
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
      {loading ? (
        <Loader />
      ) : taskList.length > 0 ? (
        <ul className="task-holder">{taskList}</ul>
      ) : (
        <p>No completed tasks</p>
      )}
    </section>
  );
}

export default CompletedTasks;
