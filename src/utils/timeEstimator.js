// src/utils/timeEstimator.js

// Estimated guesses per second based on attack scenario
const GUESSES_PER_SECOND = {
  online: 100, // online brute force limiting
  offline_slow: 10000, // slow hash function like bcrypt
  offline_fast: 1000000000, // fast hash function or unsalted
  massive: 100000000000, // massive computing resources
};

// Calculate time to crack estimate based on entropy
export const estimateCrackTime = (entropyBits, scenario = "offline_fast") => {
  if (entropyBits <= 0) return { value: 0, unit: "seconds", text: "Instant" };

  // Number of possible combinations: 2^entropy
  const possibleCombinations = Math.pow(2, entropyBits);

  // On average, half of all combinations need to be tried
  const avgCombinations = possibleCombinations / 2;

  // Time in seconds to try all combinations
  const secondsToBreak = avgCombinations / GUESSES_PER_SECOND[scenario];

  return formatTimeEstimate(secondsToBreak);
};

// Format time in seconds to human readable format
const formatTimeEstimate = (seconds) => {
  if (seconds < 1) return { value: seconds, unit: "seconds", text: "Instant" };
  if (seconds < 60)
    return {
      value: seconds,
      unit: "seconds",
      text: `${Math.floor(seconds)} seconds`,
    };
  if (seconds < 3600)
    return {
      value: seconds / 60,
      unit: "minutes",
      text: `${Math.floor(seconds / 60)} minutes`,
    };
  if (seconds < 86400)
    return {
      value: seconds / 3600,
      unit: "hours",
      text: `${Math.floor(seconds / 3600)} hours`,
    };
  if (seconds < 2592000)
    return {
      value: seconds / 86400,
      unit: "days",
      text: `${Math.floor(seconds / 86400)} days`,
    };
  if (seconds < 31536000)
    return {
      value: seconds / 2592000,
      unit: "months",
      text: `${Math.floor(seconds / 2592000)} months`,
    };
  if (seconds < 3153600000)
    return {
      value: seconds / 31536000,
      unit: "years",
      text: `${Math.floor(seconds / 31536000)} years`,
    };
  if (seconds < 315360000000)
    return {
      value: seconds / 31536000 / 100,
      unit: "centuries",
      text: `${Math.floor(seconds / 31536000 / 100)} centuries`,
    };

  return {
    value: Infinity,
    unit: "universe",
    text: "Heat death of the universe",
  };
};
