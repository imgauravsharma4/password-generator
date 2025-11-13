// src/components/layout/Container.jsx
import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0.75rem;
  }
`;

const ContentWrapper = styled.main`
  flex: 1;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 0.5rem;
  box-shadow: ${(props) => props.theme.shadows.md};
  padding: 2rem;
  margin: 1rem 0;

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 0.25rem;
  }
`;

const Container = ({ children }) => {
  return (
    <StyledContainer>
      <ContentWrapper>{children}</ContentWrapper>
    </StyledContainer>
  );
};

export default Container;
