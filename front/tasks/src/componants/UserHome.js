import Taskbar from "./Taskbar.js";
import "./InputName.css";
import "./SendButoon.css";
import LogoutButton from "./LogoutButton.js";
import { useEffect, useState } from "react";
import { useAuth } from "./hooks/auth.js";
import { useNavigate } from "react-router-dom";
export default function UserHome() {
  const auth = useAuth();
  const [tasks, setTasks] = useState([]);
  const Navigate = useNavigate();
  const [newTask, setNewTask] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!auth.user) {
      Navigate("/login");
    }
    fetch(`http://localhost:3001/api/v1/tasks/${auth.user}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => setTasks(responseData))
      .catch((err) => console.log(err));
  }, [Navigate, auth.user, refresh]);
  ///

  const onClick = async (e) => {
    try {
      const data = await fetch(
        `http://localhost:3001/api/v1/tasks/${auth.user}`,
        {
          method: `POST`,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newTask, compleat: false }),
        }
      );
      const response = await data.json();
      setNewTask("");
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <div className="App">
      <div className="InputPlusButoon" style={{ width: "70vw" }}>
        {" "}
        <div class="wrap-input-1">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            class="input"
            type="text"
            placeholder="Name"
          />
          <span class="focus-border"></span>
        </div>{" "}
        <button onClick={onClick} className="SendButoon">
          Send
          <span id="sendSpan"></span>
        </button>{" "}
        <LogoutButton />
      </div>
      {tasks.map((task) => {
        return (
          <Taskbar
            taskId={task._id}
            name={task.name}
            status={task.complete}
            onDelete={handleDeleteTask}
          />
        );
      })}
    </div>
  );
}
