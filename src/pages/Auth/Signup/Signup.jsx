import AuthLayout from "@/Layouts/AuthLayout";
import SignupForm from "./signup-form";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

const Signup = () => {
  const { user, createUser, updateUsersFullName, updateUsersProfilePicture } =
    useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignup = (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    createUser(email, password)
      .then(() => {
        updateUsersFullName(name);
        updateUsersProfilePicture(profilePicture);

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
        setProfilePicture={setProfilePicture}
        handleSignup={handleSignup}
        loading={loading}
        error={error}
        setError={setError}
      />
    </AuthLayout>
  );
};

export default Signup;
