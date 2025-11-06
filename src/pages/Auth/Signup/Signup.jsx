import AuthLayout from "@/Layouts/AuthLayout";
import SignupForm from "./signup-form";
import { use, useState } from "react";
import AuthContext from "@/Contexts/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Signup = () => {
  const { createUser, updateUsersFullName } = use(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AuthLayout imgSrc="https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15231691/453801468.0.0.1421786380.jpg?quality=90&strip=all&crop=16.73,0,66.54,100">
      <SignupForm
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSignup={handleSignup}
        loading={loading}
        error={error}
        setError={setError}
      />
    </AuthLayout>
  );
};

export default Signup;
