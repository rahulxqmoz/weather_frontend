import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

const App = () => (
  <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route
              path="/dashboard"
              element={
                  <PrivateRoute>
                      <Dashboard />
                  </PrivateRoute>
              }
          />
          <Route path="/unauthorized" element={<h2>Unauthorized</h2>} />
      </Routes>
  </Router>
);

export default App;
