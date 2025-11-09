import "@/styles/globals.css";
import { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import { Authenticator, ThemeProvider as AmplifyThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { ThemeProvider } from "../contexts/ThemeContext";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || "",
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || "",
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AmplifyThemeProvider>
        <Authenticator className="m-4">
          <Component {...pageProps} />
        </Authenticator>
      </AmplifyThemeProvider>
    </ThemeProvider>
  );
}

export default App;
