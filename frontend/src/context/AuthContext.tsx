import { createContext, useState } from 'react';

// This describes the information our AuthContext will provide
interface AuthContextType {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
}

// Create the context so authentication can be shared throughout the app
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// This describes what can be placed inside AuthProvider
interface AuthProviderProps {
  children: React.ReactNode;
}

// This component will provide authentication information to the app
export function AuthProvider({ children }: AuthProviderProps) {
  // Start with the token already saved in localStorage, if one exists
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  // Save the token when the user logs in
  function login(newToken: string) {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }

  // Remove the token when the user logs out
  function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  // Make the token, login, and logout available to child components
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}