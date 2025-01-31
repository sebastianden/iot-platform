import "@/styles/globals.css";
import { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import theme from "../components/authTheme";

Amplify.configure({
  Auth: {
    Cognito: {
      // TODO: Environment variables
      userPoolId: "eu-central-1_WCbeFbGbp",
      userPoolClientId: "2ab5b55urtmgve2qak6ei9u28v",
      userAttributes: {
        given_name: { required: true },
        family_name: { required: true },
      },
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Authenticator className="m-4">
        <Component {...pageProps} />
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;
