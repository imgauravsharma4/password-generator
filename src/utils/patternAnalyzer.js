// Analyze password for common patterns and weaknesses
export const analyzePasswordPatterns = (password) => {
  if (!password) return [];

  const warnings = [];

  // Check for dictionary words (simplified - would be more comprehensive in a real app)
  const commonWords = ["password", "admin", "welcome", "login", "user"];
  const lowerPassword = password.toLowerCase();
  for (const word of commonWords) {
    if (lowerPassword.includes(word)) {
      warnings.push({
        type: "dictionary",
        message: "Contains common dictionary word",
      });
      break;
    }
  }

  // Check for keyboard patterns
  if (hasKeyboardPattern(password)) {
    warnings.push({
      type: "keyboard",
      message: "Contains keyboard pattern (e.g., qwerty, asdfgh)",
    });
  }

  // Check for repeated characters
  if (/(.)\1{2,}/.test(password)) {
    warnings.push({
      type: "repeated",
      message: "Contains repeated characters (3+ times)",
    });
  }

  // Check for sequential characters
  if (hasSequentialChars(password)) {
    warnings.push({
      type: "sequential",
      message: "Contains sequential characters (e.g., abc, 123)",
    });
  }

  // Check for only one character type
  if (isOnlyOneCharType(password)) {
    warnings.push({
      type: "variety",
      message:
        "Uses only one character type (add uppercase, numbers, or symbols)",
    });
  }

  // Check for date patterns
  if (hasDatePattern(password)) {
    warnings.push({
      type: "date",
      message: "Contains what appears to be a date",
    });
  }

  return warnings;
};

// Check for keyboard patterns
const hasKeyboardPattern = (password) => {
  const keyboardPatterns = [
    "qwerty",
    "asdfgh",
    "zxcvbn",
    "qwertz",
    "azerty",
    "123456",
  ];

  const lowerPassword = password.toLowerCase();
  for (const pattern of keyboardPatterns) {
    if (lowerPassword.includes(pattern)) return true;
  }

  return false;
};

// Check for sequential characters
const hasSequentialChars = (password) => {
  // Common sequences
  const sequences = ["abcdefghijklmnopqrstuvwxyz", "0123456789"];

  const lowerPassword = password.toLowerCase();
  for (const seq of sequences) {
    for (let i = 0; i < seq.length - 2; i++) {
      const pattern = seq.substring(i, i + 3); // Check for 3-character sequences
      if (lowerPassword.includes(pattern)) return true;
    }
  }

  return false;
};

// Check if only one character type is used
const isOnlyOneCharType = (password) => {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^A-Za-z0-9]/.test(password);

  const typesCount = [
    hasLowercase,
    hasUppercase,
    hasNumbers,
    hasSymbols,
  ].filter(Boolean).length;
  return typesCount <= 1;
};

// Check for date patterns
const hasDatePattern = (password) => {
  // DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD, etc.
  return (
    /\d{1,4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,4}/.test(password) ||
    /\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])/.test(password)
  ); // YYMMDD format
};
