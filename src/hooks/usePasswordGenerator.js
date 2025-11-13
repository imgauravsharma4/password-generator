// src/hooks/usePasswordGenerator.js
import { useCallback } from 'react';
import { generatePassword } from '../utils/passwordUtils';

const usePasswordGenerator = () => {
  const generateNewPassword = useCallback((preferences) => {
    return generatePassword(preferences);
  }, []);

  return { generatePassword: generateNewPassword };
};

export default usePasswordGenerator;