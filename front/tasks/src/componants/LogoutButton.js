import "./LogoutButton.css";
import { useAuth } from "./hooks/auth";
import { useNavigate } from "react-router-dom";
export default function LogoutButton() {
  const auth = useAuth()
  const Navigate = useNavigate()
  const onClick = (e) =>{
    auth.logout()
    Navigate('/login')
  }
  return (
    <button className="Logout-Button" onClick={onClick}>Logout</button>
  );
}
