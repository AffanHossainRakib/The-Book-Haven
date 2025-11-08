import AuthLayout from "@/Layouts/AuthLayout";
import { useState } from "react";
import { Navigate, useLocation } from "react-router";
import LoginForm from "./login-form";
import { toast } from "sonner";
import Loader from "@/components/Loader/Loader";
import useAuth from "@/hooks/useAuth";

const Login = () => {
  const { signInWithGoogle, signInUser, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const handleSignInWithGoogle = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => {
        toast.success("Login successful!");
      })
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  };

  const handleSignIn = (email, password) => {
    setLoading(true);
    signInUser(email, password)
      .then(() => {
        toast.success("Login successful!");
      })
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <Loader />;
  }

  if (user) {
    const from = location.state?.from || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <AuthLayout imgSrc="https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15231691/453801468.0.0.1421786380.jpg?quality=90&strip=all&crop=16.73,0,66.54,100">
      <LoginForm
        handleSignInWithGoogle={handleSignInWithGoogle}
        handleSignIn={handleSignIn}
        loading={loading}
        error={error}
        setError={setError}
      />
    </AuthLayout>
  );
};

export default Login;
