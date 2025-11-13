import {
  charSets,
  similarCharacters,
  ambiguousCharacters,
} from "./passwordUtils";

// Calculate entropy based on password and preferences
export const calculateEntropy = (password, preferences) => {
  if (!password) return 0;

  // Determine character pool size based on preferences
  let poolSize = 0;
  if (preferences.includeLowercase) poolSize += charSets.lowercase.length;
  if (preferences.includeUppercase) poolSize += charSets.uppercase.length;
  if (preferences.includeNumbers) poolSize += charSets.numbers.length;
  if (preferences.includeSymbols) poolSize += charSets.symbols.length;

  // Adjust pool size for exclusions
  if (preferences.excludeSimilarCharacters) {
    // Count how many characters would be excluded
    let excludedCount = 0;
    if (preferences.includeLowercase)
      excludedCount += [...charSets.lowercase].filter((c) =>
        similarCharacters.includes(c)
      ).length;
    if (preferences.includeUppercase)
      excludedCount += [...charSets.uppercase].filter((c) =>
        similarCharacters.includes(c)
      ).length;
    if (preferences.includeNumbers)
      excludedCount += [...charSets.numbers].filter((c) =>
        similarCharacters.includes(c)
      ).length;

    poolSize -= excludedCount;
  }

  if (preferences.excludeAmbiguousCharacters) {
    // Count how many characters would be excluded
    let excludedCount = 0;
    if (preferences.includeLowercase)
      excludedCount += [...charSets.lowercase].filter((c) =>
        ambiguousCharacters.includes(c)
      ).length;
    if (preferences.includeUppercase)
      excludedCount += [...charSets.uppercase].filter((c) =>
        ambiguousCharacters.includes(c)
      ).length;
    if (preferences.includeNumbers)
      excludedCount += [...charSets.numbers].filter((c) =>
        ambiguousCharacters.includes(c)
      ).length;
    if (preferences.includeSymbols)
      excludedCount += [...charSets.symbols].filter((c) =>
        ambiguousCharacters.includes(c)
      ).length;

    poolSize -= excludedCount;
  }

  // If the calculated pool size is invalid, use a minimal default
  if (poolSize <= 0) poolSize = 26; // Default to lowercase alphabet

  // Calculate entropy using the formula: log2(poolSize^length)
  // which is equivalent to length * log2(poolSize)
  const entropyBits = password.length * Math.log2(poolSize);

  return entropyBits;
};

// Convert entropy to a strength level
export const getStrengthFromEntropy = (entropy) => {
  if (entropy < 28) return { level: "very-weak", label: "Very Weak" };
  if (entropy < 60) return { level: "weak", label: "Weak" };
  if (entropy < 80) return { level: "medium", label: "Medium" };
  if (entropy < 100) return { level: "strong", label: "Strong" };
  return { level: "very-strong", label: "Very Strong" };
};
