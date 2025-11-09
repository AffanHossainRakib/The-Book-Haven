import MainLayout from "@/Layouts/MainLayout";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Auth/Login/Login";
import { createBrowserRouter } from "react-router";
import Signup from "@/pages/Auth/Signup/Signup";
import ForgotPassword from "@/pages/Auth/ForgotPassword/ForgotPassword";
import AllBooks from "@/pages/AllBooks/AllBooks";
import AddBook from "@/pages/AddBook/AddBook";
import MyBooks from "@/pages/MyBooks/MyBooks";
import BookDetails from "@/components/Shared/BookDetails";
import PrivateRoute from "./PrivateRoute";
import UpdateBook from "@/pages/MyBooks/UpdateBook";
import Loader from "@/components/Loader/Loader";
import NotFound from "@/pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-books",
        element: (
          <PrivateRoute>
            <AllBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-books",
        element: (
          <PrivateRoute>
            <MyBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/book/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
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
  {
    path: "/loader",
    Component: Loader,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
