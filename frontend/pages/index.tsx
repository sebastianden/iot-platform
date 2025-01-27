import Home from "./home";
import { useEffect, useState } from "react";
import { getCurrentUser, signOut, AuthUser } from "aws-amplify/auth";

export default function Component() {
  const [user, setUser] = useState<AuthUser | null>(null);

  const signOutUser = async () => {
    try {
      await signOut();
      console.log("User signed out");
      setUser(null);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const getUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      console.log("Current user:", currentUser);
    } catch (error) {
      console.error("Error getting current user", error);
      setUser(null);
    }
  };

  useEffect(() => {
    // Fetch the user when the component mounts
    getUser();
  }, []);

  if (user) {
    return (
      <>
        <Home />
        <div className="grid grid-cols-2 items-center mb-4 mx-4 p-4 text-gray-500 border-2 shadow-md hover:shadow-lg border-gray-200 rounded-xl">
          <p>
            Signed in as <strong>{user.signInDetails?.loginId}</strong>
          </p>
          <button
            className="justify-self-end bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl"
            onClick={() => signOutUser()}
          >
            Sign out
          </button>
        </div>
      </>
    );
  }
}
