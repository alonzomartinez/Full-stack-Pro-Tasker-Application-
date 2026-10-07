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

  return null;
}

export default ProjectDetails;