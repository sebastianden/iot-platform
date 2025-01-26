import "@/styles/globals.css";
import { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "eu-central-1_WCbeFbGbp",
      userPoolClientId: "2ab5b55urtmgve2qak6ei9u28v",
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <Authenticator className="justify-self-center p-4 m-4 hover:shadow-lg border-gray-200 rounded-xl">
      <Component {...pageProps} />
    </Authenticator>
  );
}

export default App;
