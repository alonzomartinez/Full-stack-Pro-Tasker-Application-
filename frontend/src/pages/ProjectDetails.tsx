import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingMessage from '../components/LoadingMessage';
import ErrorMessage from '../components/ErrorMessage';
import useAuth from '../hooks/useAuth';
import type { Project, Task } from '../types';
import API_URL from '../config/api';

// This page displays one project and all of its tasks
function ProjectDetails() {
  // Get the project id from the URL
  const { id } = useParams();

  // Store the project and its tasks
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Store error and loading information
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Get the JWT from our global authentication state
  const { token } = useAuth();

    // Load the project and its tasks when the page opens
  useEffect(() => {
    async function getProjectData() {
      try {
        // Get the project information
        const projectResponse = await fetch(
          `${API_URL}/api/projects/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const projectData = await projectResponse.json();

        if (!projectResponse.ok) {
          setError(projectData.message);
          return;
        }

        setProject(projectData);

        // Get all tasks that belong to this project
        const taskResponse = await fetch(
          `${API_URL}/api/projects/${id}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const taskData = await taskResponse.json();

        if (!taskResponse.ok) {
          setError(taskData.message);
          return;
        }

        setTasks(taskData);
      } catch {
        setError('Unable to load project');
      } finally {
        setLoading(false);
      }
    }

    getProjectData();
  }, [id, token]);

    // Delete the current project
  async function handleDeleteProject() {
    try {
      const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

      const data = await response.json();

      // Show an error if the project could not be deleted
      if (!response.ok) {
        setError(data.message);
        return;
      }

      // Return to the dashboard after deleting the project
      navigate('/dashboard');
    } catch {
      setError('Unable to delete project');
    }
  }

    // Delete one task from the current project
  async function handleDeleteTask(taskId: string) {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

      const data = await response.json();

      // Show an error if the task could not be deleted
      if (!response.ok) {
        setError(data.message);
        return;
      }

      // Remove the deleted task from the tasks shown on the page
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch {
      setError('Unable to delete task');
    }
  }

    // Show a loading message while the project information is being requested
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="page-container">
          <LoadingMessage />
        </main>
      </>
    );
  }

  // Show an error if the project could not be loaded
  if (error) {
    return (
      <>
        <Navbar />
        <main className="page-container">
          <ErrorMessage message={error} />
        </main>
      </>
    );
  }

  // Do not display the page if there is no project
  if (!project) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="page-container">
        <h1>{project.name}</h1>
        <p>{project.description}</p>

        <div className="action-buttons">
          <Link to={`/projects/${project._id}/edit`}
            className="button-link">
            Edit Project
          </Link>

          <button onClick={handleDeleteProject}>
            Delete Project
          </button>

          <Link
            to={`/projects/${project._id}/tasks/new`}
            className="button-link">
            Create Task
          </Link>
        </div>

        <h2>Tasks</h2>

        {tasks.length === 0 ? (
          <p>This project does not have any tasks yet.</p>
        ) : (
          <div className="card-list">
            {tasks.map((task) => (
              <div className="card" key={task._id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>

                <div className="action-buttons">
                  <Link
                    to={`/projects/${project._id}/tasks/${task._id}/edit`}
                    className="button-link">
                    Edit Task
                  </Link>

                  <button onClick={() => handleDeleteTask(task._id)}>
                    Delete Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link to="/dashboard">Back to Dashboard</Link>
      </main>
    </>
  );
}

export default ProjectDetails;