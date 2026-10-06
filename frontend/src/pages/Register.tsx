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
  return (
    <main className="auth-page">
      <div className="auth-form">
        <h1>Pro-Tasker</h1>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <ErrorMessage message={error} />}

          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;