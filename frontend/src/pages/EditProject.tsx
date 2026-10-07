import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingMessage from '../components/LoadingMessage';
import ErrorMessage from '../components/ErrorMessage';
import useAuth from '../hooks/useAuth';
import API_URL from '../config/api';

// This page lets the logged-in user edit one of their projects
function EditProject() {
  // Get the project id from the URL
  const { id } = useParams();

  // Store the project's current name and description
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Store error and loading information
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  // Get the JWT from our global authentication state
  const { token } = useAuth();

    // Load the current project information into the form
  useEffect(() => {
    async function getProject() {
      try {
        const response = await fetch(
          `${API_URL}/api/projects/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        // Show an error if the project could not be loaded
        if (!response.ok) {
          setError(data.message);
          return;
        }

        // Put the current project information into the form state
        setName(data.name);
        setDescription(data.description);
      } catch {
        setError('Unable to load project');
      } finally {
        setLoading(false);
      }
    }

    getProject();
  }, [id, token]);
  
  return null;
}

export default EditProject;