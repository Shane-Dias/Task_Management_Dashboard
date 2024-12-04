import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Select,
  MenuItem,
  Modal,
  Box,
  Paper,
} from "@mui/material";
// import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const currentDate = new Date().toISOString().split("T")[0];

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    if (filter === "Overdue")
      return !task.completed && task.dueDate && task.dueDate < currentDate;
    return true;
  });

  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const addOrEditTask = () => {
    if (taskDetails.title.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          ...taskDetails,
          completed: false,
        },
      ]);
      setTaskDetails({ title: "", description: "", dueDate: "" });
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const confirmDeleteTask = (id) => {
    setDeleteTaskId(id);
  };

  const deleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== deleteTaskId));
    setDeleteTaskId(null);
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ textAlign: "center", color: "#3f51b5" }}
      >
        Task Management Dashboard
      </Typography>

      {/* Task Input */}
      <Box display="flex" flexDirection="column" gap={2} marginBottom={3}>
        <TextField
          name="title"
          label="Task Title"
          value={taskDetails.title}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          name="description"
          label="Task Description"
          multiline
          rows={3}
          value={taskDetails.description}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          name="dueDate"
          type="date"
          label="Due Date"
          InputLabelProps={{ shrink: true }}
          value={taskDetails.dueDate}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addOrEditTask}
          style={{
            borderRadius: "20px",
            padding: "10px 20px",
          }}
        >
          Add Task
        </Button>
      </Box>

      {/* Task Filters */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          fullWidth
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        >
          <MenuItem value="All">All Tasks</MenuItem>
          <MenuItem value="Completed">Completed Tasks</MenuItem>
          <MenuItem value="Pending">Pending Tasks</MenuItem>
          <MenuItem value="Overdue">Overdue Tasks</MenuItem>
        </Select>
        <TextField
          placeholder="Search Tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            marginLeft: "10px",
          }}
          fullWidth
        />
      </Box>

      {/* Task List */}
      <List>
        {searchedTasks.map((task) => (
          <Paper
            elevation={3}
            key={task.id}
            style={{
              marginBottom: "15px",
              padding: "15px",
              backgroundColor: task.completed ? "#e8f5e9" : "#fff",
              borderRadius: "8px",
            }}
          >
            <ListItem>
              <ListItemText
                primary={task.title}
                secondary={
                  <>
                    <Typography>{task.description}</Typography>
                    <Typography variant="caption">
                      Due Date: {task.dueDate || "N/A"}
                    </Typography>
                  </>
                }
              />
              <Button
                variant="contained"
                style={{
                  marginRight: "10px",
                  backgroundColor: task.completed ? "#66bb6a" : "#42a5f5",
                }}
                onClick={() => toggleTaskCompletion(task.id)}
              >
                {task.completed ? "Mark Incomplete" : "Mark Completed"}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => confirmDeleteTask(task.id)}
                style={{
                  backgroundColor: "#e57373",
                }}
              >
                Delete
              </Button>
            </ListItem>
          </Paper>
        ))}
      </List>

      {/* Delete Confirmation Modal */}
      <Modal open={!!deleteTaskId} onClose={() => setDeleteTaskId(null)}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bgcolor="white"
          boxShadow={24}
          p={4}
          borderRadius={2}
          style={{ width: "400px", textAlign: "center" }}
        >
          <Typography variant="h6" marginBottom={2}>
            Are you sure you want to delete this task?
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="error"
              onClick={deleteTask}
              style={{ padding: "8px 16px" }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              onClick={() => setDeleteTaskId(null)}
              style={{ padding: "8px 16px" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default App;
