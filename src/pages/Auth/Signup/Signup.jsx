import AuthLayout from "@/Layouts/AuthLayout";
import SignupForm from "./signup-form";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

const Signup = () => {
  const { user, createUser, updateUsersFullName, signInWithGoogle } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignInWithGoogle = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => {
        navigate("/");
        toast.success("Login with google account successful!");
      })
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    createUser(email, password)
      .then(() => {
        updateUsersFullName(name);

        navigate("/").then(() => {
          toast.success("Account created successfully!");
        });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (user) {
    const from = location.state?.from || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <AuthLayout imgSrc="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop">
      <SignupForm
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSignup={handleSignup}
        loading={loading}
        error={error}
        setError={setError}
        handleSignInWithGoogle={handleSignInWithGoogle}
      />
    </AuthLayout>
  );
};

export default Signup;
