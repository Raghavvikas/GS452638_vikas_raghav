import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { RootState } from "store/store";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  ...rest
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
