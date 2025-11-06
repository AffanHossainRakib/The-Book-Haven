// import { LoginForm } from "./login-form";
import AuthLayout from "@/Layouts/AuthLayout";

import { use, useState } from "react";
import AuthContext from "@/Contexts/AuthContext";
import { useNavigate } from "react-router";
import LoginForm from "./login-form";
import { toast } from "sonner";

const Login = () => {
  const { signInWithGoogle, signInUser } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        navigate("/").then(() => {
          toast.success("Login successful!");
        });
      })
      .catch((err) => console.log(err));
  };

  const handleSignIn = (email, password) => {
    setLoading(true);
    signInUser(email, password)
      .then(() => {
        navigate("/").then(() => {
          toast.success("Login successful!");
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

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
