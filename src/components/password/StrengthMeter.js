// src/components/password/StrengthMeter.jsx
import React from "react";
import styled, { css } from "styled-components";
import Tooltip from "../common/Tooltip";

const MeterContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const MeterLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Label = styled.span`
  font-size: 0.9rem;
  color: ${(props) => props.theme.typography.textColor};
  font-weight: 500;
`;

const StrengthLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  ${(props) => {
    switch (props.strength) {
      case "very-weak":
        return css`
          color: ${(props) => props.theme.strengths["very-weak"]};
        `;
      case "weak":
        return css`
          color: ${(props) => props.theme.strengths.weak};
        `;
      case "medium":
        return css`
          color: ${(props) => props.theme.strengths.medium};
        `;
      case "strong":
        return css`
          color: ${(props) => props.theme.strengths.strong};
        `;
      case "very-strong":
        return css`
          color: ${(props) => props.theme.strengths["very-strong"]};
        `;
      default:
        return css`
          color: ${(props) => props.theme.typography.mutedColor};
        `;
    }
  }}
`;

const MeterTrack = styled.div`
  position: relative;
  height: 0.5rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.divider};
  border-radius: 999px;
  overflow: hidden;
`;

const MeterFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
  border-radius: 999px;

  ${(props) => {
    let width = "0%";

    switch (props.strength) {
      case "very-weak":
        width = "20%";
        break;
      case "weak":
        width = "40%";
        break;
      case "medium":
        width = "60%";
        break;
      case "strong":
        width = "80%";
        break;
      case "very-strong":
        width = "100%";
        break;
      default:
        width = "0%";
    }

    return css`
      width: ${width};
      background-color: ${props.theme.strengths[props.strength] ||
      props.theme.colors.disabled};
    `;
  }}
`;

const EntropyInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${(props) => props.theme.typography.mutedColor};
`;

const InfoIcon = styled.span`
  margin-right: 0.25rem;
  cursor: help;
`;

const StrengthMeter = ({
  strength = "very-weak",
  entropy = 0,
  crackTime = { text: "Instant" },
}) => {
  const tooltipContent = `
    <div style="text-align: left">
      <p><strong>Password Strength Metrics:</strong></p>
      <p>• Entropy: ${entropy.toFixed(1)} bits</p>
      <p>• Est. time to crack: ${crackTime.text}</p>
      <p><small>Higher entropy = stronger password</small></p>
    </div>
  `;

  return (
    <MeterContainer>
      <MeterLabel>
        <Label>Password Strength</Label>
        <StrengthLabel strength={strength.level}>
          {strength.label}
        </StrengthLabel>
      </MeterLabel>

      <MeterTrack>
        <MeterFill strength={strength.level} />
      </MeterTrack>

      <EntropyInfo>
        <Tooltip
          content={<div dangerouslySetInnerHTML={{ __html: tooltipContent }} />}
          position="top"
        >
          <InfoIcon>ℹ️</InfoIcon>
        </Tooltip>
        Entropy: {entropy.toFixed(1)} bits | Crack time: {crackTime.text}
      </EntropyInfo>
    </MeterContainer>
  );
};

export default StrengthMeter;
