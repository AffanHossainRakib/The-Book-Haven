import { use } from "react";

import AuthContext from "@/Contexts/AuthContext";
import { useLocation } from "react-router";
import Loader from "@/components/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={location?.pathname} />;
};

export default PrivateRoute;
