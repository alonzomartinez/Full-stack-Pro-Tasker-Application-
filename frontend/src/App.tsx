import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateProject from './pages/CreateProject';
import ProjectDetails from './pages/ProjectDetails';
import EditProject from './pages/EditProject';

function App() {
  return (
    <Routes>
      {/* Send the main URL to the login page */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

            {/* Protected dashboard route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected project routes */}
      <Route
        path="/projects/new"
        element={
          <ProtectedRoute>
            <CreateProject />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects/:id/edit"
        element={
          <ProtectedRoute>
            <EditProject />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;