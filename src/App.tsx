import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './authentication/ProtectedRoute';
import Login from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import FileManager from './pages/Library';
import Payments from './pages/Payment';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import UserProfile from './components/Dashboard/UserProfile/UserProfile';
import UserManagement from './pages/UserManagement';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Signup from './pages/Signup';
import './App.css';
import { Toaster } from 'react-hot-toast';
import GroupsPageIndex from './pages/Groups';
import UserLayout from './layout/user';
import AccountIndexPage from './pages/Account';

// Create a client
const queryClient = new QueryClient();

// Route configurations
const publicRoutes = [
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> }
];

const protectedRoutes = [
  { 
    path: "/client", 
    element: <Dashboard /> 
  },
  { 
    path: "/profile/:userId", 
    element: <UserProfile userId='some-user-id' /> 
  },
  { 
    path: "/library", 
    element: (
      <DndProvider backend={HTML5Backend}>
        <FileManager />
      </DndProvider>
    )
  },
  { 
    path: "/payments", 
    element: <Payments /> 
  },
  { 
    path: "/groups", 
    element: <GroupsPageIndex /> 
  },
  { 
    path: "/account", 
    element: <AccountIndexPage /> 
  },
  { 
    path: "/user-management", 
    element: <UserManagement /> 
  }
];

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          {/* Protected Routes */}
          {protectedRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  <UserLayout>
                    {element}
                  </UserLayout>
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>

        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              style: {
                background: 'green',
              },
            },
            error: {
              style: {
                background: 'red',
              },
            },
          }}
        />
      </Router>
    </QueryClientProvider>
  );
};

export default App;