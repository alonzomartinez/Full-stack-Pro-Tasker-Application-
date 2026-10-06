import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingMessage from '../components/LoadingMessage';
import ErrorMessage from '../components/ErrorMessage';
import useAuth from '../hooks/useAuth';
import type { Project } from '../types';
import API_URL from '../config/api';

function Dashboard() {
  // Store the user's projects
  const [projects, setProjects] = useState<Project[]>([]);

  // Store loading and error information
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Get the JWT from our global authentication state
  const { token } = useAuth();

    // Load the logged-in user's projects when the dashboard opens
  useEffect(() => {
    async function getProjects() {
      try {
        const response = await fetch(`${API_URL}/api/projects`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        // Show an error if the projects could not be loaded
        if (!response.ok) {
          setError(data.message);
          return;
        }

        setProjects(data);
      } catch {
        setError('Unable to load projects');
      } finally {
        setLoading(false);
      }
    }

    getProjects();
  }, [token]);

 return null;
}

export default Dashboard;