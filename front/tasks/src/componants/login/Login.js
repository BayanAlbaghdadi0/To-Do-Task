import "./Login.css";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth";
export default function Login() {
  const auth = useAuth();
  const Navigate = useNavigate();
  // const [id,setUser] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userName = formData.get("userName");
    const password = formData.get("password");
    const newUser = { userName: userName, password: password };

    try {
      const response = await fetch("http://localhost:3001/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (data.success) {
        // setUser(data.id);
        auth.login(data.id);
        Navigate(`/${data.id}`);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="containerlo">
      <div className="login-box">
        <h3 id="Signuph3">Login</h3>
        <br></br>
        <form onSubmit={onSubmit}>
          <div className="user-box">
            <input type="text" name="userName" required="" />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required="" />
            <label>Password</label>
          </div>
          <center>
            <button id="S-and-l-b" type="submit">
              Login
              <span></span>
            </button>
            <br></br>
            <Link to="/signup">
              go to signup
              <span></span>
            </Link>
          </center>
        </form>
      </div>
    </div>
  );
}
