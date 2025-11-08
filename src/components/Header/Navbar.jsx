import AuthContext from "@/Contexts/AuthContext";
import { use } from "react";
import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Loader from "../Loader/Loader";

const Navbar = () => {
  const { user, signOutUser, loading } = use(AuthContext);

  const commonLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "All Books",
      path: "/all-books",
    },
    {
      title: "Add Book",
      path: "/add-book",
    },
    {
      title: "My Books",
      path: "/my-books",
    },
  ];

  const publicNavLinks = [
    {
      title: "Login",
      path: "/login",
    },
    {
      title: "Sign Up",
      path: "/signup",
    },
  ];

  const handleSignOut = () => {
    signOutUser().then(() => {
      toast.success("Signed out successfully!");
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <header>
      <nav>
        <ul className="flex justify-center mt-5">
          {commonLinks.map((link, index) => (
            <li key={index} className="mr-5">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "font-bold underline underline-offset-4" : ""
                }
              >
                {({ isActive }) => (
                  <Button
                    variant="outline"
                    className={`${
                      isActive
                        ? "font-bold underline underline-offset-4 border-primary text-primary"
                        : ""
                    }`}
                  >
                    {link.title}
                  </Button>
                )}
              </NavLink>
            </li>
          ))}

          {!user &&
            publicNavLinks.map((link, index) => (
              <li key={index} className="mr-5">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? "font-bold underline underline-offset-4" : ""
                  }
                >
                  {({ isActive }) => (
                    <Button
                      variant="outline"
                      className={`${
                        isActive
                          ? "font-bold underline underline-offset-4 border-primary text-primary"
                          : ""
                      }`}
                    >
                      {link.title}
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          {user && <Button onClick={handleSignOut}>Sign Out</Button>}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
