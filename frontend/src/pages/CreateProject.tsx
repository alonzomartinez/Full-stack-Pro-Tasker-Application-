import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ErrorMessage from '../components/ErrorMessage';
import useAuth from '../hooks/useAuth';
import API_URL from '../config/api';

function CreateProject() {
  // Store the project information entered into the form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Store error and loading information
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Get the JWT from our global authentication state
  const { token } = useAuth();

    // Send the new project to the backend
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description
        })
      });

      const data = await response.json();

      // Show an error if the project could not be created
      if (!response.ok) {
        setError(data.message);
        return;
      }

      // Return to the dashboard after creating the project
      navigate('/dashboard');
    } catch {
      setError('Unable to create project');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="page-container">
        <div className="form-container">
          <h1>Create Project</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />

            {error && <ErrorMessage message={error} />}

            <button type="submit" disabled={loading}>
              {loading ? 'Creating Project...' : 'Create Project'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              disabled={loading}
            >
              Cancel
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default CreateProject;