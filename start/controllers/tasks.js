
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/crud")
  .then((element) => console.log("  Hi : >> db runing"))
  .catch((error) => console.log(error));

//create Schema

// Define schema for tasks
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

// Define schema for user
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [taskSchema], // Array of tasks
});

// Create model
const User = mongoose.model("User", userSchema);
// module.exports = User;

///

const createTask = async (req, res) => {
  const userId = req.params.id;
  // console.log(userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.tasks.push(req.body);
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findById(userId);
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.tasks);
  } catch (error) {
    res.status(500).json({ massage: error });
  }
};

const getTask = async (req, res) => {
  try {
    // taskId
    const userId = req.params.id;
    const taskId = req.params.tID;
    if (!userId || !taskId) {
      return res.status(400).json({ message: "User ID or Task ID is missing" });
    }
    // console.log(userId, taskId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const task = user.tasks.id(taskId);
    console.log(task);
    // const task = user.tasks.find((e) => e._id == taskId);
    // console.log(task);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(404).json({ msg: error + "bom" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req.params.id;
    const taskId = req.params.tID;
    // console.log(userId, taskId);
    const user = await User.findById(userId);
    // console.log(user)
    // user.tasks.pull(taskId);
    const taskIndex = user.tasks.findIndex((e) => e._id == taskId);
    if (taskIndex == -1) {
      return res.status(404).json({ message: "Task not found" });
    }
    user.tasks.pull(taskId);
    await user.save();
    // user.tasks.splice(taskIndex, 1);
    res.status(200).json({ msg: "taskdelete" });
  } catch (error) {
    res.status(404).json({ msg: error + "." });
  }
};

const updateTask = async (req, res) => {
  const { id, tID } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const task = user.tasks.id(tID);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.set(req.body);
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  User,
};

// const getTaskForUser = async (req, res) => {
//   const { userId, taskId } = req.params;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const task = user.tasks.id(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Controller for deleting a specific task of a specific user
// const deleteTaskForUser = async (req, res) => {
//   const { userId, taskId } = req.params;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     user.tasks.pull(taskId);
//     await user.save();
//     res.status(200).json({ user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Controller for updating a specific task of a specific user
// const updateTaskForUser = async (req, res) => {

// module.exports = {
//   createTaskForUser,
//   getAllTasksForUser,
//   getTaskForUser,
//   deleteTaskForUser,
//   updateTaskForUser
// };
