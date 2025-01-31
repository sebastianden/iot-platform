import "@/styles/globals.css";
import { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      // TODO: Environment variables
      userPoolId: "eu-central-1_WCbeFbGbp",
      userPoolClientId: "2ab5b55urtmgve2qak6ei9u28v",
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <Authenticator className="justify-self-center p-4 m-4 border-gray-200 ">
      <Component {...pageProps} />
    </Authenticator>
  );
}

export default App;
