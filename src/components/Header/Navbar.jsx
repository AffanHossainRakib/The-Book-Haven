import AuthContext from "@/Contexts/AuthContext";
import { use } from "react";
import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { toast } from "sonner";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const navLinks = [
    {
      title: "Login",
      path: "/login",
    },
    {
      title: "Sign Up",
      path: "/signup",
    },
  ];

  // const privateNavLinks = [
  //   {
  //     title: "Logout",
  //     path: "/logout",
  //   },
  // ];

  const handleSignOut = () => {
    signOutUser().then(() => {
      toast.success("Signed out successfully!");
    });
  };
  return (
    <header>
      <nav>
        <ul className="flex justify-center">
          {!user &&
            navLinks.map((link, index) => (
              <li key={index} className="mr-5">
                <NavLink to={link.path}>{link.title}</NavLink>
              </li>
            ))}

          {/* {user &&
            privateNavLinks.map((link, index) => (
              <li key={index} className="mr-5">
                <NavLink to={link.path}>{link.title}</NavLink>
              </li>
            ))} */}
          {user && <Button onClick={handleSignOut}>Sign Out</Button>}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
