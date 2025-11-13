// src/components/layout/Header.jsx
import React from "react";
import styled from "styled-components";
import ThemeSwitcher from "../theme/ThemeSwitcher";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  margin-bottom: 1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.typography.headingColor};

  @media (max-width: 576px) {
    font-size: 1.25rem;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo>
        <LogoIcon>🔒</LogoIcon>
        <Title>Password Generator</Title>
      </Logo>
      <ThemeSwitcher />
    </HeaderWrapper>
  );
};

export default Header;
