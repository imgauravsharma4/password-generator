// src/components/common/Checkbox.jsx
import React from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  background: ${(props) =>
    props.checked ? props.theme.colors.primary : props.theme.colors.surface};
  border: 1px solid
    ${(props) =>
      props.checked ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: 0.25rem;
  transition: all ${(props) => props.theme.animation.transition};
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const CheckIcon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  visibility: ${(props) => (props.checked ? "visible" : "hidden")};
`;

const Label = styled.label`
  margin-left: 0.5rem;
  color: ${(props) => props.theme.typography.textColor};
  font-size: 0.9rem;
  cursor: pointer;
`;

const Checkbox = ({ label, checked, onChange, id, ...props }) => {
  const uniqueId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <CheckboxContainer>
      <HiddenCheckbox
        id={uniqueId}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <StyledCheckbox
        checked={checked}
        onClick={() => onChange({ target: { checked: !checked } })}
      >
        <CheckIcon checked={checked} viewBox="0 0 24 24" width="16" height="16">
          <polyline points="20 6 9 17 4 12" />
        </CheckIcon>
      </StyledCheckbox>
      <Label htmlFor={uniqueId}>{label}</Label>
    </CheckboxContainer>
  );
};

export default Checkbox;
