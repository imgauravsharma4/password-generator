// src/hooks/useClipboard.js
import { useState } from "react";

const useClipboard = (timeout = 2000) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    if (!text) return false;

    try {
      // Modern clipboard API
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset the copied state after timeout
      setTimeout(() => setCopied(false), timeout);
      return true;
    } catch (err) {
      console.error("Failed to copy text: ", err);
      return false;
    }
  };

  return { copied, copyToClipboard };
};

export default useClipboard;
