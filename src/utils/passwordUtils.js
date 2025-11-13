// Character sets
export const charSets = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

// Characters to exclude if similar characters should be avoided
export const similarCharacters = "il1Lo0O";

// Characters to exclude if ambiguous characters should be avoided
export const ambiguousCharacters = "{}[]()/\\'\"`~,;:.<>";

// Generate password based on preferences
export const generatePassword = (preferences) => {
  let charset = "";

  // Build character set based on preferences
  if (preferences.includeLowercase) charset += charSets.lowercase;
  if (preferences.includeUppercase) charset += charSets.uppercase;
  if (preferences.includeNumbers) charset += charSets.numbers;
  if (preferences.includeSymbols) charset += charSets.symbols;

  // Handle exclusions
  if (preferences.excludeSimilarCharacters) {
    charset = charset
      .split("")
      .filter((char) => !similarCharacters.includes(char))
      .join("");
  }

  if (preferences.excludeAmbiguousCharacters) {
    charset = charset
      .split("")
      .filter((char) => !ambiguousCharacters.includes(char))
      .join("");
  }

  // If no character set is selected, default to lowercase
  if (!charset) {
    charset = charSets.lowercase;
  }

  let password = "";
  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loop

  while (attempts < maxAttempts) {
    password = "";
    for (let i = 0; i < preferences.passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    // Check for sequential characters if that option is enabled
    if (preferences.avoidSequentialChars && hasSequentialChars(password)) {
      attempts++;
      continue;
    }

    // Check for repeated characters if that option is enabled
    if (preferences.avoidRepeatedChars && hasRepeatedChars(password)) {
      attempts++;
      continue;
    }

    // Make sure at least one character from each selected type is included
    const hasRequiredChars = validatePasswordComplexity(password, preferences);
    if (!hasRequiredChars) {
      attempts++;
      continue;
    }

    break;
  }

  return password;
};

// Check if password has sequential characters
const hasSequentialChars = (password) => {
  for (let i = 0; i < password.length - 2; i++) {
    // Check for 3 consecutive characters in the ASCII sequence
    const c1 = password.charCodeAt(i);
    const c2 = password.charCodeAt(i + 1);
    const c3 = password.charCodeAt(i + 2);

    if (c1 + 1 === c2 && c2 + 1 === c3) {
      return true;
    }
  }
  return false;
};

// Check if password has repeated characters
const hasRepeatedChars = (password) => {
  for (let i = 0; i < password.length - 2; i++) {
    // Check for 3 consecutive identical characters
    if (password[i] === password[i + 1] && password[i] === password[i + 2]) {
      return true;
    }
  }
  return false;
};

// Validate that password contains at least one character from each selected type
const validatePasswordComplexity = (password, preferences) => {
  const hasLowercase = !preferences.includeLowercase || /[a-z]/.test(password);
  const hasUppercase = !preferences.includeUppercase || /[A-Z]/.test(password);
  const hasNumbers = !preferences.includeNumbers || /[0-9]/.test(password);
  const hasSymbols =
    !preferences.includeSymbols || /[^A-Za-z0-9]/.test(password);

  return hasLowercase && hasUppercase && hasNumbers && hasSymbols;
};
