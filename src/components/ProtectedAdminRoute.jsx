// src/components/ProtectedAdminRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/signin" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;

