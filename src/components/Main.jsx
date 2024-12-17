import TaskInput from "./TaskInput.jsx";
import Tasks from "./Tasks.jsx";
import CompletedTasks from "./CompletedTasks.jsx";

function Main({
  todoObj,
  loading,
  onSubmitNewTask,
  onChangeTaskCheck,
  onChangeTaskUncheck,
  finishEdit,
  deleteTask,
}) {
  return (
    <main>
      <TaskInput onSubmitNewTask={onSubmitNewTask} />
      <Tasks
        loading={loading}
        tasks={todoObj.tasks}
        onChangeTaskCheck={onChangeTaskCheck}
        finishEdit={finishEdit}
        deleteTask={deleteTask}
      />
      <CompletedTasks
        loading={loading}
        completed={todoObj.completed}
        onChangeTaskUncheck={onChangeTaskUncheck}
        deleteTask={deleteTask}
      />
    </main>
  );
}

export default Main;
