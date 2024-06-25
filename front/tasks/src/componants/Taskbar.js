import "./Taskbar.css";
import { Link } from "react-router-dom";

import "./DeleteButoon.css";
import { useAuth } from "./hooks/auth";
export default function Taskbar({ taskId, name, status, onDelete }) {
  const auth = useAuth();
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/tasks/${auth.user}/${taskId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        onDelete(taskId);
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div key={taskId} className="card">
      <div className="card-details">
        <div>
          <p style={{ width: "160px" }}>name the task: {name}</p>
          <h5>status: {String(status)}</h5>
        </div>
        <div className="EditPlusDeletButun">
          <button onClick={handleDelete} id="DButoon" className="noselectD">
            <span className="Dtext">Delete</span>
            <span className="Dicon">
              <svg
                id="Dsvg"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <Link to={`/taskinfo/${auth.user}/${taskId}`}>
        <button className="card-button">More info</button>
      </Link>
    </div>
  );
}
