// src/hooks/usePasswordStrength.js
import { useState, useEffect, useContext, useCallback } from "react";
import { PreferencesContext } from "../contexts/PreferencesContext";
import {
  calculateEntropy,
  getStrengthFromEntropy,
} from "../utils/entropyCalculator";
import { estimateCrackTime } from "../utils/timeEstimator";
import { analyzePasswordPatterns } from "../utils/patternAnalyzer";

const usePasswordStrength = (password) => {
  const { preferences } = useContext(PreferencesContext);
  const [entropyBits, setEntropyBits] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState({
    level: "very-weak",
    label: "Very Weak",
  });
  const [crackTimeEstimate, setCrackTimeEstimate] = useState({
    value: 0,
    unit: "seconds",
    text: "Instant",
  });
  const [patternWarnings, setPatternWarnings] = useState([]);

  // Calculate the strength of the password
  const calculateStrength = useCallback((pwd, prefs) => {
    if (!pwd) return { level: "very-weak", label: "Very Weak" };

    const entropy = calculateEntropy(pwd, prefs);
    return getStrengthFromEntropy(entropy);
  }, []);

  useEffect(() => {
    if (!password) {
      setEntropyBits(0);
      setPasswordStrength({ level: "very-weak", label: "Very Weak" });
      setCrackTimeEstimate({ value: 0, unit: "seconds", text: "Instant" });
      setPatternWarnings([]);
      return;
    }

    // Calculate entropy
    const entropy = calculateEntropy(password, preferences);
    setEntropyBits(entropy);

    // Determine strength level
    const strength = getStrengthFromEntropy(entropy);
    setPasswordStrength(strength);

    // Estimate time to crack
    const timeEstimate = estimateCrackTime(entropy);
    setCrackTimeEstimate(timeEstimate);

    // Analyze for patterns
    const warnings = analyzePasswordPatterns(password);
    setPatternWarnings(warnings);
  }, [password, preferences]);

  return {
    calculateStrength,
    entropyBits,
    passwordStrength,
    crackTimeEstimate,
    patternWarnings,
  };
};

export default usePasswordStrength;
