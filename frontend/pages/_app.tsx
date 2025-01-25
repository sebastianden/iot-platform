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
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
