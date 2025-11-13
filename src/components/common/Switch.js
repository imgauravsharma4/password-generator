// src/components/common/Switch.jsx
import React from "react";
import styled from "styled-components";

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.75rem 0;
`;

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
`;

const SwitchInput = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${(props) => props.theme.colors.primary};
  }

  &:checked + span:before {
    transform: translateX(1.5rem);
  }

  &:focus + span {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary + "40"};
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.disabled};
  transition: all ${(props) => props.theme.animation.transition};
  border-radius: 1.5rem;

  &:before {
    position: absolute;
    content: "";
    height: 1.1rem;
    width: 1.1rem;
    left: 0.2rem;
    bottom: 0.2rem;
    background-color: white;
    border-radius: 50%;
    transition: all ${(props) => props.theme.animation.transition};
  }
`;

const Label = styled.div`
  margin-left: 0.75rem;
  font-size: 0.9rem;
  color: ${(props) => props.theme.typography.textColor};
`;

const Switch = ({ label, checked, onChange, id, ...props }) => {
  const uniqueId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <SwitchContainer>
      <SwitchLabel htmlFor={uniqueId}>
        <SwitchInput
          id={uniqueId}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <Slider />
      </SwitchLabel>
      {label && <Label>{label}</Label>}
    </SwitchContainer>
  );
};

export default Switch;
