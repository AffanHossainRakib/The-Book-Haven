import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AuthContext from "@/Contexts/AuthContext";
import { use, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const ForgetPassword = () => {
  const { resetPassword } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const preferredEmail = location.state?.email || "";
  const [email, setEmail] = useState(preferredEmail);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent. Please check your inbox.");
        navigate("/login");
      })
      .catch(() => {
        toast.error("Failed to send password reset email.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="w-full max-w-md h-screen mx-auto flex flex-col justify-center space-y-6">
      <form onSubmit={handleResetPassword}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Forgot Password</FieldLegend>
            <FieldDescription>
              Enter your email address below and we'll send you a link to reset
              your password.
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="penguin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Reset Password</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ForgetPassword;
