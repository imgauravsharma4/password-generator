// src/components/layout/Footer.jsx
import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${(props) => props.theme.typography.mutedColor};
`;

const Link = styled.a`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  transition: color ${(props) => props.theme.animation.transition};

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
    text-decoration: underline;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <p>
        © {currentYear} Secure Password Generator | Built with{" "}
        <Link
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </Link>{" "}
        |{" "}
        <Link
          href="https://github.com/yourusername/password-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </p>
    </FooterWrapper>
  );
};

export default Footer;
