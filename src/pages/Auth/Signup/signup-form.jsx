import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

import * as Yup from "yup";

const SignupForm = ({
  className,
  setName,
  setEmail,
  setPassword,
  handleSignup,
  loading,
  error,
  setError,

  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleNameChange = (e) => {
    setError(null); // Clear previous error messages
    Yup.string()
      .required("Full name is required.")
      .validate(e.target.value)
      .then(() => {
        setName(e.target.value);
      })
      .catch((validationError) => {
        setError(validationError.message);
      });
  };

  const handleEmailChange = (e) => {
    setError(null); // Clear previous error messages
    Yup.string()
      .email("Invalid email address.")
      .required("Email is required.")
      .validate(e.target.value)
      .then(() => {
        setEmail(e.target.value);
      })
      .catch((validationError) => {
        setError(validationError.message);
      });
  };

  const handlePasswordChange = (e) => {
    setError(null); // Clear previous error messages
    Yup.string()
      .min(6, "Password must be at least 6 characters long.")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
      .validate(e.target.value)
      .then(() => {
        setPassword(e.target.value);
      })
      .catch((validationError) => {
        setError(validationError.message);
      });
  };

  return (
    <form
      onSubmit={handleSignup}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent">
            Create an account
          </h1>
          <p className="text-gray-600 text-sm text-balance">
            Enter your details below to create a new account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <Field className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
            {error}
          </Field>
        )}

        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Mr. Penguin"
            required
            onChange={handleNameChange}
            disabled={loading}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="penguin@example.com"
            required
            onChange={handleEmailChange}
            disabled={loading}
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              onChange={handlePasswordChange}
              disabled={loading}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </Field>

        <Field>
          {loading ? (
            <Button className="flex flex-row gap-2">
              <Spinner /> Signing up...
            </Button>
          ) : (
            <Button type="submit">Sign up</Button>
          )}
        </Field>

        <Field>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default SignupForm;
