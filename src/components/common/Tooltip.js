// src/components/common/Tooltip.jsx
import React, { useState, useRef } from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  position: relative;
  display: inline-flex;
`;

const TooltipContent = styled.div`
  position: absolute;
  z-index: 10;
  max-width: 250px;
  padding: 0.5rem 0.75rem;
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.typography.textColor};
  font-size: 0.85rem;
  border-radius: 0.25rem;
  box-shadow: ${(props) => props.theme.shadows.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  transition: opacity ${(props) => props.theme.animation.transition},
    visibility ${(props) => props.theme.animation.transition};

  ${(props) => {
    switch (props.position) {
      case "top":
        return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          margin-bottom: 0.5rem;
          
          &::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 6px;
            border-style: solid;
            border-color: ${props.theme.colors.border} transparent transparent transparent;
          }
        `;
      case "bottom":
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          margin-top: 0.5rem;
          
          &::after {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 6px;
            border-style: solid;
            border-color: transparent transparent ${props.theme.colors.border} transparent;
          }
        `;
      case "left":
        return `
          right: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(-8px);
          margin-right: 0.5rem;
          
          &::after {
            content: '';
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-width: 6px;
            border-style: solid;
            border-color: transparent transparent transparent ${props.theme.colors.border};
          }
        `;
      case "right":
        return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(8px);
          margin-left: 0.5rem;
          
          &::after {
            content: '';
            position: absolute;
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-width: 6px;
            border-style: solid;
            border-color: transparent ${props.theme.colors.border} transparent transparent;
          }
        `;
      default:
        return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          margin-bottom: 0.5rem;
        `;
    }
  }}
`;

const Tooltip = ({
  content,
  position = "top",
  children,
  delay = 300,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <TooltipContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      {...props}
    >
      {children}
      <TooltipContent visible={isVisible} position={position}>
        {content}
      </TooltipContent>
    </TooltipContainer>
  );
};

export default Tooltip;
