import { createContext } from 'react';

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
