import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Custom hook that gives components easy access to AuthContext
function useAuth() {
  const context = useContext(AuthContext);

  // Make sure this hook is only used inside AuthProvider
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}

export default useAuth;