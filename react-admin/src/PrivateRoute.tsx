import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const isAuthenticated = localStorage.getItem("token"); // Or use your own auth logic

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
