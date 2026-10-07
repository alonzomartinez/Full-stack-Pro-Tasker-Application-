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

  return null;
}

export default CreateTask;