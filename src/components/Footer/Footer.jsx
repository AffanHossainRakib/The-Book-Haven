import { BookOpen, FacebookIcon, Instagram } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { title: "Home", path: "/" },
      { title: "All Books", path: "/all-books" },
      { title: "Add Book", path: "/add-book" },
      { title: "My Books", path: "/my-books" },
    ],
    support: [
      { title: "About Us", path: "#" },
      { title: "Contact", path: "#" },
      { title: "Privacy Policy", path: "#" },
      { title: "Terms of Service", path: "#" },
    ],
  };

  return (
    <footer className="bg-secondary border-t border-border mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-indigo-600 to-teal-500 p-2 rounded-lg">
                <BookOpen color="white"/>
              </div>
              <span className="text-xl font-bold text-foreground">
                The Book Haven
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Your personal digital library where book lovers come together to
              discover, share, and discuss their favorite reads.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-muted hover:bg-accent/20 rounded-full flex items-center justify-center transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted hover:bg-accent/20 rounded-full flex items-center justify-center transition-colors"
              >
                {/* new X logo */}
                <svg
                  className="w-5 h-5 text-foreground"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted hover:bg-accent/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              &copy; {currentYear} The Book Haven. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link to="#" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link to="#" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
