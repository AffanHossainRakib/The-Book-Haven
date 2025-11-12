import AuthLayout from "@/Layouts/AuthLayout";
import { useState } from "react";
import { Navigate, useLocation } from "react-router";
import LoginForm from "./login-form";
import { toast } from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

const Login = () => {
  const { signInUser, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const handleSignIn = (email, password) => {
    setLoading(true);
    signInUser(email, password)
      .then(() => {
        toast.success("Login successful!");
      })
      .catch((err) => {
        toast.error(err.message || "Login failed. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  if (user) {
    const from = location.state?.from || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <AuthLayout imgSrc="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop">
      <LoginForm
        handleSignIn={handleSignIn}
        loading={loading}
        error={error}
        setError={setError}
      />
    </AuthLayout>
  );
};

export default Login;
