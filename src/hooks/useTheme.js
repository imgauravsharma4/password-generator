// src/hooks/useTheme.js
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { lightTheme } from "../styles/themes/light";

const useTheme = () => {
  const context = useContext(ThemeContext);

  // Return a default theme object if context is undefined
  // This prevents hard errors but we still log a warning
  if (context === undefined) {
    console.warn("useTheme must be used within a ThemeProvider");
    return {
      theme: lightTheme,
      isDarkMode: false,
      toggleTheme: () =>
        console.warn("toggleTheme called outside ThemeProvider"),
    };
  }

  return context;
};

export default useTheme;
