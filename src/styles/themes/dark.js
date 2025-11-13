// src/styles/themes/dark.js
export const darkTheme = {
  name: "dark",
  colors: {
    background: "#121212",
    foreground: "#e9ecef",
    primary: "#4cc9f0",
    secondary: "#4361ee",
    success: "#06d6a0",
    danger: "#e63946",
    warning: "#ffb703",
    info: "#4cc9f0",
    surface: "#1e1e1e",
    border: "#343a40",
    divider: "#495057",
    disabled: "#6c757d",
    placeholder: "#adb5bd",
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.2)",
    md: "0 4px 6px rgba(0, 0, 0, 0.3)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.4)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.5)",
  },
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    headingColor: "#e9ecef",
    textColor: "#ced4da",
    mutedColor: "#adb5bd",
  },
  strengths: {
    "very-weak": "#e63946",
    weak: "#ffb703",
    medium: "#ffd166",
    strong: "#06d6a0",
    "very-strong": "#118ab2",
  },
  animation: {
    transition: "0.3s ease-in-out",
  },
};
