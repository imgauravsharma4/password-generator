import { createContext, useState, useEffect } from "react";

export const PreferencesContext = createContext();

const defaultPreferences = {
  passwordLength: 16,
  includeLowercase: true,
  includeUppercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeSimilarCharacters: false,
  excludeAmbiguousCharacters: false,
  avoidSequentialChars: false,
  avoidRepeatedChars: false,
};

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(defaultPreferences);

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem("passwordPreferences");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  useEffect(() => {
    // Save preferences to localStorage
    localStorage.setItem("passwordPreferences", JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (newPreferences) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        resetPreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};
