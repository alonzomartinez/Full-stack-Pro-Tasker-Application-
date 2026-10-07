import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingMessage from '../components/LoadingMessage';
import ErrorMessage from '../components/ErrorMessage';
import useAuth from '../hooks/useAuth';
import type { Task } from '../types';
import API_URL from '../config/api';

// This page lets the user edit an existing task
function EditTask() {
  // Get the project id and task id from the URL
  const { projectId, taskId } = useParams();

  // Store the task's current information
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  // Store error and loading information
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  // Get the JWT from our global authentication state
  const { token } = useAuth();

    // Load the task information when the page opens
  useEffect(() => {
    async function getTask() {
      try {
        // Get all tasks that belong to this project
        const response = await fetch(
          `${API_URL}/api/projects/${projectId}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        // Find the task that matches the task id from the URL
        const task = data.find((item: Task) => item._id === taskId);

        if (!task) {
          setError('Task not found');
          return;
        }

        // Put the current task information into the form state
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
      } catch {
        setError('Unable to load task');
      } finally {
        setLoading(false);
      }
    }

    getTask();
  }, [projectId, taskId, token]);

    // Send the updated task information to the backend
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setSaving(true);

    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
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

      // Show an error if the task could not be updated
      if (!response.ok) {
        setError(data.message);
        return;
      }

      // Return to the project after saving the task
      navigate(`/projects/${projectId}`);
    } catch {
      setError('Unable to update task');
    } finally {
      setSaving(false);
    }
  }

  return null;
}

export default EditTask;