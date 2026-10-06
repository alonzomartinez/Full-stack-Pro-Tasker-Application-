import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import API_URL from '../config/api';
import ErrorMessage from '../components/ErrorMessage';

function Login() {
  // Store the values entered into the login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Store an error message and whether the login request is loading
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Get the login function from AuthContext
  const { login } = useAuth();
  
return null;
}

export default Login;