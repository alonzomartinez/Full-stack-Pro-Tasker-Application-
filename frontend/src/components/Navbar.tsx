import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Navbar() {
  const navigate = useNavigate();

  // Get the logout function from AuthContext
  const { logout } = useAuth();

  // Log the user out and return to the login page
  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="logo">
        Pro-Tasker
      </Link>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;