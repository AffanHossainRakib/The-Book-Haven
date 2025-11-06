import AuthContext from "@/Contexts/AuthContext";
import { use } from "react";
import { NavLink } from "react-router";

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

  const privateNavLinks = [
    {
      title: "Logout",
      path: "/logout",
    },
  ];

  return (
    <header>
      <nav>
        <ul className="flex justify-center">
          {navLinks.map((link, index) => (
            <li key={index} className="mr-5">
              <NavLink to={link.path}>{link.title}</NavLink>
            </li>
          ))}

          {user &&
            privateNavLinks.map((link, index) => (
              <li key={index} className="mr-5">
                <NavLink to={link.path}>{link.title}</NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
