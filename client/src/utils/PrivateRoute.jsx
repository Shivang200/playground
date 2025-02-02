import { Navigate, useLocation } from "react-router-dom";
import React from "react"; // Importing React library

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // Redirect to signin and keep track of intended path
    return <Navigate to={`/signin?redirect=${encodeURIComponent(location.pathname)}`} />;
  }

  return children;
};

export default PrivateRoute;