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

  return null;
}

export default EditProject;