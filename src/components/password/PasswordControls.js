import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { PreferencesContext } from "../../contexts/PreferencesContext";
import Range from "../common/Range";
import Checkbox from "../common/Checkbox";
import Button from "../common/Button";
import Tooltip from "../common/Tooltip";

const ControlsContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const ControlSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.typography.headingColor};
  margin: 0 0 0.75rem 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const CharacterOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.5rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ResetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="20"
    height="20"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const PasswordControls = ({ onGeneratePassword }) => {
  const { preferences, updatePreferences, resetPreferences } =
    useContext(PreferencesContext);
  // Reference to track first render
  const isFirstRender = useRef(true);

  // Generate new password whenever preferences change, but skip first render
  useEffect(() => {
    // Skip effect on first render to prevent double generation
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Make sure onGeneratePassword exists before calling it
    if (onGeneratePassword) {
      onGeneratePassword();
    }
  }, [preferences, onGeneratePassword]);

  const handleLengthChange = (value) => {
    updatePreferences({ passwordLength: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    updatePreferences({ [name]: checked });
  };

  const atLeastOneCharTypeSelected =
    preferences.includeLowercase ||
    preferences.includeUppercase ||
    preferences.includeNumbers ||
    preferences.includeSymbols;

  return (
    <ControlsContainer>
      <ControlSection>
        <Range
          label="Password Length"
          value={preferences.passwordLength}
          onChange={handleLengthChange}
          min={8}
          max={64}
          step={1}
          valueDisplay={`${preferences.passwordLength} characters`}
        />
      </ControlSection>

      <ControlSection>
        <SectionTitle>Character Types</SectionTitle>
        <CharacterOptionsGrid>
          <Checkbox
            label="Include Lowercase (a-z)"
            checked={preferences.includeLowercase}
            onChange={handleCheckboxChange}
            name="includeLowercase"
            disabled={
              !atLeastOneCharTypeSelected ||
              (!preferences.includeUppercase &&
                !preferences.includeNumbers &&
                !preferences.includeSymbols)
            }
          />

          <Checkbox
            label="Include Uppercase (A-Z)"
            checked={preferences.includeUppercase}
            onChange={handleCheckboxChange}
            name="includeUppercase"
            disabled={
              !atLeastOneCharTypeSelected ||
              (!preferences.includeLowercase &&
                !preferences.includeNumbers &&
                !preferences.includeSymbols)
            }
          />

          <Checkbox
            label="Include Numbers (0-9)"
            checked={preferences.includeNumbers}
            onChange={handleCheckboxChange}
            name="includeNumbers"
            disabled={
              !atLeastOneCharTypeSelected ||
              (!preferences.includeLowercase &&
                !preferences.includeUppercase &&
                !preferences.includeSymbols)
            }
          />

          <Checkbox
            label="Include Symbols (!@#$...)"
            checked={preferences.includeSymbols}
            onChange={handleCheckboxChange}
            name="includeSymbols"
            disabled={
              !atLeastOneCharTypeSelected ||
              (!preferences.includeLowercase &&
                !preferences.includeUppercase &&
                !preferences.includeNumbers)
            }
          />
        </CharacterOptionsGrid>
      </ControlSection>

      <ControlSection>
        <SectionTitle>Advanced Options</SectionTitle>
        <CharacterOptionsGrid>
          <Tooltip
            content="Exclude similar characters like 'i', 'l', '1', 'L', 'o', '0', 'O'"
            position="top"
          >
            <Checkbox
              label="Exclude Similar Characters"
              checked={preferences.excludeSimilarCharacters}
              onChange={handleCheckboxChange}
              name="excludeSimilarCharacters"
            />
          </Tooltip>

          <Tooltip
            content="Exclude ambiguous characters like {}[]()/\~,;:<>"
            position="top"
          >
            <Checkbox
              label="Exclude Ambiguous Characters"
              checked={preferences.excludeAmbiguousCharacters}
              onChange={handleCheckboxChange}
              name="excludeAmbiguousCharacters"
            />
          </Tooltip>

          <Tooltip
            content="Avoid sequences like 'abc', '123', etc."
            position="top"
          >
            <Checkbox
              label="Avoid Sequential Characters"
              checked={preferences.avoidSequentialChars}
              onChange={handleCheckboxChange}
              name="avoidSequentialChars"
            />
          </Tooltip>

          <Tooltip
            content="Avoid repeated characters like 'aaa', '111', etc."
            position="top"
          >
            <Checkbox
              label="Avoid Repeated Characters"
              checked={preferences.avoidRepeatedChars}
              onChange={handleCheckboxChange}
              name="avoidRepeatedChars"
            />
          </Tooltip>
        </CharacterOptionsGrid>
      </ControlSection>

      <ButtonGroup>
        <Button
          onClick={resetPreferences}
          variant="secondary"
          icon={<ResetIcon />}
          fullWidth
        >
          Reset Options
        </Button>
      </ButtonGroup>
    </ControlsContainer>
  );
};

export default React.memo(PasswordControls);
