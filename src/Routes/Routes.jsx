import MainLayout from "@/Layouts/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Auth/Login/Login";
import { createBrowserRouter } from "react-router";
import Signup from "@/pages/Auth/Signup/Signup";
import ForgotPassword from "@/pages/Auth/ForgotPassword/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
]);

export default router;
