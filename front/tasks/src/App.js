import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserHome from "./componants/UserHome.js";
import Login from "./componants/login/Login";
import Signup from "./componants/Signup/Signup";
// import LoginRegester from "./componants/Login-Regester/Login-Regester.js";
import TaskInfo from "./componants/TaskInfo.js";
import "./App.css";
import { AuthProvider } from "./componants/hooks/auth.js";
// import { useAuth } from "./componants/hooks/auth.js";
// const user= false;

function App() {
  // const auth = useAuth();
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/:id" element={<UserHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/taskinfo/:id/:tID" element={<TaskInfo />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
