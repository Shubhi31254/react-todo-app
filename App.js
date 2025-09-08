import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  // Toggle Complete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Start Editing
  const startEditing = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  // Save Edited Task
  const saveEdit = (id) => {
    if (editText.trim() === "") return;
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, text: editText } : t
      )
    );
    setEditId(null);
    setEditText("");
  };

  // Clear Completed
  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  // Filtered Tasks
  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>✅ Interactive To-Do List</h1>

      {/* Input Box */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>
          Add
        </button>
      </div>

      {/* Filters */}
      <div style={styles.filterContainer}>
        <button onClick={() => setFilter("all")} style={filter === "all" ? styles.activeFilter : styles.filterButton}>All</button>
        <button onClick={() => setFilter("active")} style={filter === "active" ? styles.activeFilter : styles.filterButton}>Active</button>
        <button onClick={() => setFilter("completed")} style={filter === "completed" ? styles.activeFilter : styles.filterButton}>Completed</button>
        <button onClick={clearCompleted} style={styles.clearButton}>Clear Completed</button>
      </div>

      {/* Task List */}
      <ul style={styles.list}>
        {filteredTasks.map((task) => (
          <li key={task.id} style={styles.listItem}>
            {editId === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                  style={styles.input}
                />
                <button onClick={() => saveEdit(task.id)} style={styles.saveButton}>Save</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleTask(task.id)}
                  style={{
                    ...styles.taskText,
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "gray" : "black",
                  }}
                >
                  {task.text}
                </span>
                <div>
                  <button onClick={() => startEditing(task.id, task.text)} style={styles.editButton}>✏️</button>
                  <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>❌</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    width: "450px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: { textAlign: "center", marginBottom: "20px" },
  inputContainer: { display: "flex", marginBottom: "15px" },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginRight: "10px",
  },
  addButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  filterButton: {
    padding: "6px 12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "white",
  },
  activeFilter: {
    padding: "6px 12px",
    border: "1px solid #4CAF50",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#e8f5e9",
  },
  clearButton: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#f44336",
    color: "white",
    cursor: "pointer",
  },
  list: { listStyle: "none", padding: 0 },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    marginBottom: "8px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
  },
  taskText: { cursor: "pointer", flex: 1 },
  editButton: {
    marginRight: "8px",
    border: "none",
    background: "transparent",
    fontSize: "16px",
    cursor: "pointer",
  },
  saveButton: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2196F3",
    color: "white",
    cursor: "pointer",
  },
  deleteButton: {
    border: "none",
    background: "transparent",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default App;
