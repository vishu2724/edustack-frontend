import { Navigate, Outlet } from "react-router-dom";

/*
  ProtectedUserRoute
  -------------------
  - Agar user logged in hai (token present) → route allow
  - Agar token nahi hai → signin page par redirect
*/

function ProtectedUserRoute() {
  const token = localStorage.getItem("token");

  // ❌ User not logged in
  if (!token) {
    return <Navigate to="/user/signin" replace />;
  }

  // ✅ User logged in → allow access
  return <Outlet />;
}

export default ProtectedUserRoute;
