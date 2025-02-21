// taskController.js (or wherever you manage your task routes/logic)
import Task from "../models/Task.js"; // Importing Task model

// Fetch All Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    
    res.status(500).json({ message: "Error fetching tasks", error }); // Include error message
  }
};

// Create a Task
export const createTask = async(req, res) => {
  try {
    const { title, description } = req.body;

    // Validate required fields (more comprehensive validation)
    if (!title) { // Check for empty or whitespace-only titles
      return res.status(400).json({ message: "Task title is required!" });
    }

    const newTask = new Task({
      title,
      description: description || "No description" // You might want to handle a missing description differently
      // Add other fields as needed (e.g., user who created the task)
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask); // 201 Created status code

  } catch (error) {
    console.error("Task creation error:", error); // Improved error logging
    res.status(500).json({ message: "Error creating task" }); // Include error message
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id, { title,description, completed }, { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully",task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};


// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } =req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" }); 
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};