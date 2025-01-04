import React, { useState } from "react";

export default function Automation() {
  const [tasks, setTasks] = useState([
    { id: 1, task: "Order Fulfillment", description: "Processing customer service orders for new telecom connections", status: "Pending" },
    { id: 2, task: "Maintenance Scheduling", description: "Scheduling regular maintenance for network infrastructure", status: "Pending" },
    { id: 3, task: "Resource Allocation", description: "Allocating network bandwidth and other telecom resources", status: "Pending" },
  ]);

  const [message, setMessage] = useState("");

  const automateTasks = () => {
    const updatedTasks = tasks.map((task) => ({
      ...task,
      status: "Completed",
    }));
    setTasks(updatedTasks);
    setMessage("All telecom tasks have been automated successfully!");
  };

  const resetTasks = () => {
    const resetTasks = tasks.map((task) => ({
      ...task,
      status: "Pending",
    }));
    setTasks(resetTasks);
    setMessage("Tasks have been reset to Pending.");
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: "Completed" } : task
    );
    setTasks(updatedTasks);
    setMessage(`Task ${id} has been marked as Completed.`);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.header}>Telecom Automation System</h1>
        <p style={styles.description}>
          This system automates key telecom industry tasks.
        </p>
        {message && <p style={styles.message}>{message}</p>}

        <h2 style={styles.subHeader}>Automation Tasks</h2>
        <ul style={styles.taskList}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                ...styles.taskItem,
                backgroundColor: task.status === "Completed" ? "#d4edda" : "#f8d7da",
                color: task.status === "Completed" ? "#155724" : "#721c24",
              }}
            >
              <strong>{task.task}:</strong> <span>{task.description}</span> <br />
              <span><strong>Status:</strong> {task.status}</span>
              {task.status === "Pending" && (
                <button
                  onClick={() => completeTask(task.id)}
                  style={styles.smallButton}
                >
                  Mark as Completed
                </button>
              )}
            </li>
          ))}
        </ul>
        <div style={styles.buttonContainer}>
          <button onClick={automateTasks} style={styles.button}>
            Automate All Tasks
          </button>
          <button onClick={resetTasks} style={{ ...styles.button, backgroundColor: "#6c757d" }}>
            Reset Tasks
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundImage: "url('/automate.jpg')", // Ensure the image is in the public folder
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", // Full screen height
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundAttachment: "fixed",
  },
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slight transparency on the background
    borderRadius: "10px",
    textAlign: "center",
    width: "60%",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  header: {
    color: "#333",
    marginBottom: "10px",
  },
  subHeader: {
    color: "#444",
    marginTop: "20px",
  },
  description: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  message: {
    fontSize: "16px",
    color: "#155724",
    backgroundColor: "#d4edda",
    padding: "10px",
    borderRadius: "5px",
    margin: "20px 0",
  },
  taskList: {
    listStyleType: "none",
    padding: 0,
  },
  taskItem: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "18px",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "0 10px",
  },
  smallButton: {
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};
