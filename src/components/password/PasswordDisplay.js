// src/components/password/PasswordDisplay.jsx
import React, { useState } from "react";
import styled from "styled-components";
import useClipboard from "../../hooks/useClipboard";
import Tooltip from "../common/Tooltip";

const DisplayContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 0.375rem;
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: border-color ${(props) => props.theme.animation.transition};

  &:focus-within {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const PasswordInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.typography.textColor};
  font-family: "Fira Code", monospace;
  font-size: 1.125rem;
  padding: 1rem 0.75rem;
  outline: none;
  width: 100%;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.typography.mutedColor};
  width: 2.75rem;
  height: 2.75rem;
  cursor: pointer;
  transition: all ${(props) => props.theme.animation.transition};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  &:disabled {
    color: ${(props) => props.theme.colors.disabled};
    cursor: not-allowed;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid ${(props) => props.theme.colors.border};
`;

const SuccessMessage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  background-color: ${(props) => props.theme.colors.success};
  color: white;
  border-radius: 0.25rem;
  transform: translateY(-100%);
  animation: fadeOut 2s forwards;

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const EyeIcon = ({ visible }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {visible ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ) : null}
    {visible ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    )}
  </svg>
);

const ClipboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
    />
  </svg>
);

const PasswordDisplay = ({ password, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { copied, copyToClipboard } = useClipboard();

  const handleCopy = () => {
    if (password) {
      copyToClipboard(password);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ position: "relative" }}>
      <DisplayContainer>
        <PasswordInput
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Your secure password"
          aria-label="Generated password"
          readOnly={!onChange}
        />
        <ActionButtonsContainer>
          <Tooltip content={showPassword ? "Hide password" : "Show password"}>
            <ActionButton
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon visible={showPassword} />
            </ActionButton>
          </Tooltip>

          <Tooltip content="Copy to clipboard">
            <ActionButton
              onClick={handleCopy}
              disabled={!password}
              aria-label="Copy to clipboard"
            >
              <ClipboardIcon />
            </ActionButton>
          </Tooltip>
        </ActionButtonsContainer>
      </DisplayContainer>
      {copied && <SuccessMessage>Copied to clipboard!</SuccessMessage>}
    </div>
  );
};

export default PasswordDisplay;
