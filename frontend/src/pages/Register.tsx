import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import API_URL from '../config/api';

function Register() {
  // Store the information entered into the registration form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Store an error message and whether the request is loading
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Send the registration information to the backend
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      }
    );

      const data = await response.json();

      // Show the backend error message if registration was unsuccessful
      if (!response.ok) {
        setError(data.message);
        return;
      }

      // Return to login after the account is created
      navigate('/login');
    } catch {
      setError('Unable to connect to the server');
    } finally {
      setLoading(false);
    }
  }
  return null;
}

export default Register;