import { signOut, AuthUser } from "aws-amplify/auth";
import { Dispatch, SetStateAction } from "react";

interface AuthInfoProps {
  user: AuthUser;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
}

const AuthInfo = (props: AuthInfoProps) => {
  const { user, setUser } = props;
  const signOutUser = async () => {
    try {
      await signOut();
      console.log("User signed out");
      setUser(null);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <div className="grid grid-cols-3 items-center card mx-4 mb-4">
      <p className="truncate col-span-2 text-gray-500">
        Signed in as {user.signInDetails?.loginId}
      </p>
      <button
        className="justify-self-end bg-gray-500 hover:bg-gray-700 dark:bg-gray-700 hover:dark:bg-gray-500 text-white dark:text-red-600 py-2 px-4 rounded-xl"
        onClick={() => signOutUser()}
      >
        Sign out
      </button>
    </div>
  );
};

export default AuthInfo;
