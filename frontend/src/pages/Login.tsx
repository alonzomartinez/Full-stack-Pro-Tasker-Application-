import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import API_URL from '../config/api';
import ErrorMessage from '../components/ErrorMessage';

function Login() {
  // Store the values entered into the login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Store an error message and whether the login request is loading
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Get the login function from AuthContext
  const { login } = useAuth();

    // Send the email and password to the backend when the form is submitted
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      // Show the backend error message if the login was unsuccessful
      if (!response.ok) {
        setError(data.message);
        return;
      }

      // Save the JWT using AuthContext
      login(data.token);

      // Go to the dashboard after a successful login
      navigate('/dashboard');
    } catch {
      setError('Unable to connect to the server');
    } finally {
      setLoading(false);
    }
  }
  
return null;
}

export default Login;