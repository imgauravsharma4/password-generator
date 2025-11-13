import { useContext, useEffect } from "react";
import styled, {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from "styled-components";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PreferencesProvider } from "./contexts/PreferencesContext";
import { PasswordProvider, PasswordContext } from "./contexts/PasswordContext";
import Container from "./components/layout/Container";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PasswordDisplay from "./components/password/PasswordDisplay";
import PasswordControls from "./components/password/PasswordControls";
import StrengthMeter from "./components/password/StrengthMeter";
import { lightTheme } from "./styles/themes/light";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: ${(props) => props.theme.typography.fontFamily};
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.typography.textColor};
    line-height: 1.5;
    transition: background-color ${(props) => props.theme.animation.transition},
    color ${(props) => props.theme.animation.transition};
  }
`;

const AppTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.typography.headingColor};
  margin-bottom: 1.5rem;
`;

const AppSubtitle = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.typography.mutedColor};
  margin-bottom: 1.5rem;
`;

const AppContent = () => {
  const {
    password,
    createNewPassword,
    passwordStrength,
    entropyBits,
    crackTimeEstimate,
  } = useContext(PasswordContext);

  // Generate a password when the component mounts
  useEffect(() => {
    if (!password) {
      createNewPassword();
    }
  }, [createNewPassword, password]);

  return (
    <>
      <Header />

      <AppTitle>Create Secure Passwords</AppTitle>
      <AppSubtitle>
        Generate strong, random passwords with customizable options and security
        analysis.
      </AppSubtitle>

      <PasswordDisplay password={password} />

      <StrengthMeter
        strength={passwordStrength}
        entropy={entropyBits}
        crackTime={crackTimeEstimate}
      />

      <PasswordControls onGeneratePassword={createNewPassword} />
      <Footer />
    </>
  );
};

// Main App component with all providers
const App = () => {
  return (
    <ThemeProvider>
      <StyledThemeProvider theme={lightTheme}>
        <PreferencesProvider>
          <PasswordProvider>
            <GlobalStyle />
            <Container>
              <AppContent />
            </Container>
          </PasswordProvider>
        </PreferencesProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

export default App;
