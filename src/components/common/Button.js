// src/components/common/Button.jsx
import React from "react";
import styled, { css } from "styled-components";

const variants = {
  primary: css`
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    &:hover {
      background-color: ${(props) => props.theme.colors.secondary};
    }
  `,
  secondary: css`
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
    &:hover {
      background-color: ${(props) => props.theme.colors.primary + "10"};
    }
  `,
  danger: css`
    background-color: ${(props) => props.theme.colors.danger};
    color: white;
    &:hover {
      background-color: ${(props) => props.theme.colors.danger + "dd"};
    }
  `,
};

const sizes = {
  sm: css`
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  `,
  md: css`
    padding: 0.5rem 1rem;
    font-size: 1rem;
  `,
  lg: css`
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  transition: all ${(props) => props.theme.animation.transition};
  box-shadow: ${(props) => props.theme.shadows.sm};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) => variants[props.variant] || variants.primary}
  ${(props) => sizes[props.size] || sizes.md}
  
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

const IconContainer = styled.span`
  display: inline-flex;
  ${(props) =>
    props.left &&
    css`
      margin-right: 0.5rem;
    `}
  ${(props) =>
    props.right &&
    css`
      margin-left: 0.5rem;
    `}
`;

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <IconContainer left>{icon}</IconContainer>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <IconContainer right>{icon}</IconContainer>
      )}
    </StyledButton>
  );
};

export default Button;
