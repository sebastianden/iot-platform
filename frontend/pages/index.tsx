import Home from "./home";
import Auth from "aws-amplify";

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Home />
        <div className="grid grid-cols-2 items-center mb-4 mx-4 p-4 text-gray-500 border-2 shadow-md hover:shadow-lg border-gray-200 rounded-xl">
          <p>
            Signed in as <strong>{session.user.email}</strong>
          </p>
          <button
            className="justify-self-end bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </>
    );
  }
  return (
    <div className="grid grid-cols-1 m-4 p-4 text-gray-500 border-2 shadow-md hover:shadow-lg border-gray-200 rounded-xl">
      <p className="pb-4 justify-self-center">Not signed in</p>
      <button
        className="justify-self-center bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl"
        onClick={() => signIn("cognito")}
      >
        Sign in
      </button>
    </div>
  );
}
