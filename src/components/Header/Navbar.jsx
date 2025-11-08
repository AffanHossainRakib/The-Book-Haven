import AuthContext from "@/Contexts/AuthContext";
import { use } from "react";
import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { toast } from "sonner";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);

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
      path: "/all-books",
    },
  ];

  const publicNavLinks = [
    {
      title: "Login",
      path: "/login",
    },
    {
      title: "Register",
      path: "/register",
    },
  ];

  const handleSignOut = () => {
    signOutUser().then(() => {
      toast.success("Signed out successfully!");
    });
  };
  return (
    <header>
      <nav>
        <ul className="flex justify-center">
          {commonLinks.map((link, index) => (
            <li key={index} className="mr-5">
              <NavLink to={link.path}>{link.title}</NavLink>
            </li>
          ))}

          {!user &&
            publicNavLinks.map((link, index) => (
              <li key={index} className="mr-5">
                <NavLink to={link.path}>{link.title}</NavLink>
              </li>
            ))}
          {user && <Button onClick={handleSignOut}>Sign Out</Button>}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
