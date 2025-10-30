import { useState } from "react";
import Button from "../components/button";
import useValidation from "../utils/validation";
import useLocalStorageTasks from "../utils/localStorage";

export type TaskType = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
};

const TaskForm = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
  const { errors, errorValidation } = useValidation();
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task: TaskType) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(newTaskText);
    errorValidation(newTaskText);
    setNewTaskText("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Manage your tasks efficiently</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <Button type="submit" variant="primary">
            Add Task
          </Button>
        </div>

        {errors.task && (
          <div className="text-red-500 ">
            <span className="error-icon">⚠️</span>
            {errors.task}
          </div>
        )}
      </form>

      <div className="flex gap-2 mb-4">
        <Button
          variant={filter === "all" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No tasks found
          </p>
        ) : (
          filteredTasks.map((task: TaskType) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span
                  className={`${
                    task.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <div className="flex gap-3">
                <Button
                  variant={task.completed?"success":"secondary"}
                  size="sm"
                  onClick={() => toggleTask(task.id)}
                  aria-label="Delete task"
                >
                  {task.completed?<p>Mark task as incomplete</p>:<p>Mark task as complete...</p>}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>
          {tasks.filter((task: TaskType) => !task.completed).length} tasks
          remaining
        </p>
      </div>
    </div>
  );
};

export default TaskForm;
