import { v4 as uuidv4 } from "uuid";
import Task from "./Task.jsx";
import Loader from "./Loader.jsx";

function Tasks({ loading, tasks, onChangeTaskCheck, finishEdit, deleteTask }) {
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
      {loading ? (
        <Loader />
      ) : taskList.length > 0 ? (
        <ul className="task-holder">{taskList}</ul>
      ) : (
        <p>No tasks</p>
      )}
    </section>
  );
}

export default Tasks;
