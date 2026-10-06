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

 return null;
}

export default Dashboard;