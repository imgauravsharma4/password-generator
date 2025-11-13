// src/contexts/ThemeContext.js
import React, { createContext, useEffect, useState } from "react";
import { lightTheme } from "../styles/themes/light";
import { darkTheme } from "../styles/themes/dark";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    try {
      // Check if user has previously selected a theme
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        // Try to parse as JSON, but handle strings like "light" or "dark" directly
        if (savedTheme === '"light"' || savedTheme === "light") {
          setIsDarkMode(false);
        } else if (savedTheme === '"dark"' || savedTheme === "dark") {
          setIsDarkMode(true);
        } else {
          // Try to parse as JSON object
          try {
            const parsedTheme = JSON.parse(savedTheme);
            setIsDarkMode(parsedTheme === "dark");
          } catch (e) {
            console.warn(
              "Invalid theme in localStorage, using system preference instead"
            );
            checkSystemPreference();
          }
        }
      } else {
        // If no saved preference, check system preference
        checkSystemPreference();
      }
    } catch (error) {
      console.error("Error loading theme preference:", error);
      // Default to system preference if there's an error
      checkSystemPreference();
    }
  }, []);

  // Helper function to check system color scheme preference
  const checkSystemPreference = () => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
  };

  useEffect(() => {
    // Update theme based on dark mode setting
    setTheme(isDarkMode ? darkTheme : lightTheme);

    // Store preference (use a simple string, not JSON)
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Add class to body for global styling
    document.body.className = isDarkMode ? "dark-theme" : "light-theme";
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
