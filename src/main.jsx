import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App.jsx'
import Auth from "./components/Auth/Auth.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import { AuthProvider } from './components/Auth/AuthContext.jsx';
import PrivateRoute from './components/Auth/PrivateRoute.jsx';
import LoggedOutRoute from './components/Auth/LoggedOutRoute.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={
          <LoggedOutRoute>
            <Auth />
          </LoggedOutRoute>
        }
        />
        <Route path="/" element={
          <PrivateRoute>
            <App />
          </PrivateRoute>
        }
        />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
        />
      </Routes>
    </Router>
  </AuthProvider>
)
