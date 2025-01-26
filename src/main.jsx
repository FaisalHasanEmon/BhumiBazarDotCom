import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/Router";
import AuthProvider from "./context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./context/ThemeProvider";
import { ToastContainer } from "react-toastify";

// Tanstack Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <ToastContainer />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
