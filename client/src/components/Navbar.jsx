import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1>Coding School</h1>
      <div className="register_container">
        <ul>
            <li id="login" onClick={() => navigate('/login')}>
              Log In
            </li>
            <li id="signup" onClick={() => navigate('/signup')}>
              Sign Up
            </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
