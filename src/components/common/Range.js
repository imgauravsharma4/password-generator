// src/components/common/Range.jsx
import React from "react";
import styled from "styled-components";

const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0;
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${(props) => props.theme.typography.textColor};
`;

const ValueDisplay = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
`;

const InputWrapper = styled.div`
  position: relative;
  height: 2rem;
  width: 100%;
`;

const Track = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 0.375rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.border};
  border-radius: 999px;
`;

const FilledTrack = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 0.375rem;
  width: ${(props) =>
    ((props.value - props.min) / (props.max - props.min)) * 100}%;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 999px;
`;

const RangeInput = styled.input.attrs({ type: "range" })`
  position: absolute;
  height: 0.375rem;
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    cursor: pointer;
    box-shadow: ${(props) => props.theme.shadows.sm};
    transition: transform 0.1s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &::-moz-range-thumb {
    width: 1.25rem;
    height: 1.25rem;
    background-color: ${(props) => props.theme.colors.primary};
    border: none;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: ${(props) => props.theme.shadows.sm};
    transition: transform 0.1s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &:focus {
    &::-webkit-slider-thumb {
      box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary + "40"};
    }
    &::-moz-range-thumb {
      box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary + "40"};
    }
  }
`;

const Range = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  valueDisplay,
  ...props
}) => {
  const handleChange = (e) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <RangeContainer>
      <Label>
        {label}
        <ValueDisplay>{valueDisplay || value}</ValueDisplay>
      </Label>
      <InputWrapper>
        <Track />
        <FilledTrack value={value} min={min} max={max} />
        <RangeInput
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          {...props}
        />
      </InputWrapper>
    </RangeContainer>
  );
};

export default Range;
