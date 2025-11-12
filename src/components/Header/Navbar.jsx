import { useState } from "react";
import { NavLink, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

import useTheme from "@/hooks/useTheme";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { BookOpen, Cross, Menu, Moon, Sun, X } from "lucide-react";

const Navbar = () => {
  const { user, signOutUser, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "All Books", path: "/all-books" },
    { title: "Add Book", path: "/add-book" },
    { title: "My Books", path: "/my-books" },
  ];

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast.success("Signed out successfully!");
      setMobileMenuOpen(false);
    } catch (err) {
      toast.error(err.message || "Failed to sign out");
    }
  };

  // if (loading) {
  //   return (
  //     <nav className="bg-secondary border-b border-border shadow-sm">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="flex justify-between items-center h-16">
  //           <div className="h-8 w-32 bg-muted animate-pulse rounded" />
  //         </div>
  //       </div>
  //     </nav>
  //   );
  // }

  return (
    <nav className="bg-secondary border-b border-border shadow-sm sticky top-0 z-50 backdrop-blur-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-indigo-600 to-teal-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <BookOpen color="white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent">
              The Book Haven
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-lg"
                      : "text-foreground hover:bg-muted"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-card border border-border hover:bg-muted transition-all duration-300 shadow-sm"
              title={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-indigo-600" fill="currentColor" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" fill="currentColor" />
              )}
            </button>

            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 bg-card rounded-lg shadow-sm border border-border">
                  <img
                    src={
                      user.photoURL ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s"
                    }
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full object-cover"
                    title={user.displayName || "User"}
                  />
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-5 py-2 font-semibold rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-lg"
                        : "text-foreground hover:bg-muted"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `px-5 py-2 font-semibold rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-lg"
                        : "text-foreground hover:bg-muted"
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background transition-colors"
          >
            <div className="px-4 py-4 space-y-2">
              {/* Theme Toggle for Mobile */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-secondary hover:bg-muted transition-all"
              >
                <span className="font-medium text-foreground">
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
                {theme === "dark" ? (
                  <Sun
                    className="w-5 h-5 text-indigo-600"
                    fill="currentColor"
                  />
                ) : (
                  <Moon
                    className="w-5 h-5 text-indigo-600"
                    fill="currentColor"
                  />
                )}
              </button>

              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-600 to-teal-500 text-white"
                        : "text-foreground hover:bg-secondary"
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              ))}

              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-lg">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/40"}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-semibold rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2 pt-2 border-t border-border">
                  <NavLink
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block w-full px-4 py-3 font-semibold rounded-lg transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-teal-500 text-white"
                          : "text-foreground hover:bg-secondary border-2 border-border"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block w-full px-4 py-3 font-semibold rounded-lg transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-teal-500 text-white"
                          : "text-foreground hover:bg-secondary border-2 border-border"
                      }`
                    }
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
