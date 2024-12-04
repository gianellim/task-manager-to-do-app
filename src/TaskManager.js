import React, { useState } from 'react';
import './TaskManager.css'; // Assuming custom styling will be in this file.

const TaskManager = () => {
  const [tasks, setTasks] = useState([]); // State for storing tasks
  const [taskText, setTaskText] = useState(''); // State for input field text
  const [filter, setFilter] = useState('all'); // Filter for tasks ('all', 'active', 'completed')

  // Add a new task
  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([
        ...tasks,
        { id: Date.now(), text: taskText, completed: false },
      ]);
      setTaskText('');
    }
  };

  // Mark a task as completed
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Edit a task
  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // Show all tasks
  });

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      {/* Input for new task */}
      <div className="task-input">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Filter buttons */}
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      {/* List of tasks */}
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => editTask(task.id, prompt('Edit task', task.text))}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
