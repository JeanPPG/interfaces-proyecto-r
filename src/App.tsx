import React from "react";
import { MemoryRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Welcome } from "./pages/Welcome";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { TestingArea } from "./pages/TestingArea";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import D2RTest from "./pages/D2R";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/testing"
              element={
                <ProtectedRoute>
                  <TestingArea />
                </ProtectedRoute>
              }
            />
            <Route
              path="/d2r"
              element={
                <ProtectedRoute>
                  <D2RTest endTest={() => { /* implement endTest function here */ }} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
