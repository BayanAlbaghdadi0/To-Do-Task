import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./TaskInfo.css";
import "./InputText.css";
export default function TaskInfo() {
  const { id, tID } = useParams();
  const [task, setTask] = useState(null);
  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState(false);
  const [newUp, setNewUp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/tasks/${id}/${tID}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const responseData = await response.json();
        if (response.ok) {
          setTask(responseData.task);
          setNewName(responseData.task.name);
          setNewStatus(responseData.task.complete);
        } else {
          console.log(responseData.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id && tID) {
      fetchData();
    }
  }, [id, tID, newUp]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/tasks/${id}/${tID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newName, complete: newStatus }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        setTask(responseData.task);
        setNewUp(!newUp);
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        height: "90vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div className="card1">
        <div className="bg1">
          <br></br>
          <p id="text-info">Task Name:<b> {task.name}</b></p>
          <br></br>
          <p id="text-info">Status:<b> {String(task.complete)}</b></p>
        </div>
        <div className="blob1"></div>
      </div>
      <div>
        <div class="input-containerU">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New Task Name"
          />
          <label for="input-field" class="input-labelU">
            Enter text
          </label>
          <span class="input-highlight"></span>
        </div>

        <label class="material-checkbox">
          <input
            type="checkbox"
            checked={newStatus}
            onChange={(e) => setNewStatus(e.target.checked)}
          />
          <span class="checkmark"></span>
          Checkbox Label
        </label>
        <button id="update-button" onClick={handleUpdate}>
          Update Task
        </button>
      </div>
    </div>
  );
}
