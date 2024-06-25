import "./Signup.css";
import { Link } from "react-router-dom";
export default function Signup() {
  const onSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userName = formData.get("userName");
    const password = formData.get("password");
    const newUser = { userName: userName, password: password };
    await fetch("http://localhost:3001/api/v1/regester", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    }).then(response => response.json()).then(re=>console.log(re)).catch(err =>console.log(err))};

  return (
    <div class="containerlo">
      <div class="login-box">
        <h3 id="Signuph3">Signup</h3>
        <br></br>
        <form onSubmit={onSubmit}>
          <div class="user-box">
            <input type="text" name="userName" required="" />
            <label>Username</label>
          </div>
          <div class="user-box">
            <input type="password" name="password" required="" />
            <label>Password</label>
          </div>
          <center>
            <button id="S-and-l-b" type="submit">
              Regester
              <span></span>
            </button>
            <Link to="/login">
              go to Login
              <span></span>
            </Link>
          </center>
        </form>
      </div>
    </div>
  );
}
