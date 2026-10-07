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

  return null;
}

export default ProjectDetails;