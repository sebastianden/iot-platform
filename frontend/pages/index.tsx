import Home from "./home";
import { useEffect, useState } from "react";
import { getCurrentUser, signOut, AuthUser } from "aws-amplify/auth";
import AuthInfo from "@/components/authInfo";

export default function Component() {
  const [user, setUser] = useState<AuthUser | null>(null);

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
        <AuthInfo user={user} setUser={setUser} />
      </>
    );
  }
}
