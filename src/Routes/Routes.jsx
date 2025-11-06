import MainLayout from "@/Layouts/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login/Login";
import { createBrowserRouter } from "react-router";
import Signup from "@/pages/Signup/Signup";

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
]);

export default router;
