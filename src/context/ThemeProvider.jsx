import React, { createContext } from "react";
import { toast, Bounce } from "react-toastify";
export const themeContext = createContext(null);

// eslint-disable-next-line react/prop-types
const ThemeProvider = ({ children }) => {
  // Success Toaster
  const notifySuccess = (message) => {
    toast.success(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  // Warning Toaster
  const notifyWarning = (message) => {
    toast.warn(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  // Error Toaster
  const notifyError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  const color = "black";
  const theme = {
    color,
    notifySuccess,
    notifyWarning,
    notifyError,
  };
  return (
    <themeContext.Provider value={theme}>{children}</themeContext.Provider>
  );
};

export default ThemeProvider;
