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
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const ForgetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.state);
  const preferredEmail = location.state?.email || "";
  const [email, setEmail] = useState(preferredEmail);
  console.log(email);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
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
