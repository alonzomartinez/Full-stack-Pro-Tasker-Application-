import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ErrorMessage from '../components/ErrorMessage';
import useAuth from '../hooks/useAuth';
import API_URL from '../config/api';

// This page lets the user create a task for a project
function CreateTask() {
  // Get the project id from the URL
  const { projectId } = useParams();

  // Store the task information entered into the form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  // Store error and loading information
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Get the JWT from our global authentication state
  const { token } = useAuth();

    // Send the new task to the backend
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/projects/${projectId}/tasks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            description,
            status
          })
        }
      );

      const data = await response.json();

      // Show an error if the task could not be created
      if (!response.ok) {
        setError(data.message);
        return;
      }

      // Return to the project after creating the task
      navigate(`/projects/${projectId}`);
    } catch {
      setError('Unable to create task');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="page-container">
        <div className="form-container">
          <h1>Create Task</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Task Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />

            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            {error && <ErrorMessage message={error} />}

            <button type="submit" disabled={loading}>
              {loading ? 'Creating Task...' : 'Create Task'}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/projects/${projectId}`)}
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

export default CreateTask;