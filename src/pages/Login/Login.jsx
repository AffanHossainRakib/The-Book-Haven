import { LoginForm } from "./login-form";
import AuthLayout from "@/Layouts/AuthLayout";

const Login = () => {
  return (
    <AuthLayout imgSrc="https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15231691/453801468.0.0.1421786380.jpg?quality=90&strip=all&crop=16.73,0,66.54,100">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
