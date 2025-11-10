import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Routes/Routes";
import AuthProvider from "./Contexts/AuthProvider";
import { ThemeProvider } from "./Contexts/ThemeContext";
import { Toaster } from "./components/ui/sonner";
import { Toaster as HotToaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
        <HotToaster position="top-center" reverseOrder={false} />
        <Analytics />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
