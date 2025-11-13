import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { PreferencesContext } from "./PreferencesContext";
import usePasswordGenerator from "../hooks/usePasswordGenerator";
import usePasswordStrength from "../hooks/usePasswordStrength";

export const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [password, setPassword] = useState("");
  const [passwordHistory, setPasswordHistory] = useState([]);
  const { preferences } = useContext(PreferencesContext);
  const { generatePassword } = usePasswordGenerator();
  const { passwordStrength, entropyBits, crackTimeEstimate, patternWarnings } =
    usePasswordStrength(password);

  // Use a ref to track if this is the first render
  const isInitialMount = useRef(true);

  // Generate password on initial mount only
  useEffect(() => {
    if (isInitialMount.current) {
      const newPassword = generatePassword(preferences);
      setPassword(newPassword);
      isInitialMount.current = false;
    }
  }, [generatePassword, preferences]);

  // Memoize the createNewPassword function to prevent infinite re-renders
  const createNewPassword = useCallback(() => {
    const newPassword = generatePassword(preferences);
    setPassword(newPassword);
  }, [preferences, generatePassword]);

  const clearHistory = () => {
    setPasswordHistory([]);
    localStorage.removeItem("passwordHistory");
  };

  return (
    <PasswordContext.Provider
      value={{
        password,
        setPassword,
        createNewPassword,
        passwordHistory,
        clearHistory,
        passwordStrength,
        entropyBits,
        crackTimeEstimate,
        patternWarnings,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};
