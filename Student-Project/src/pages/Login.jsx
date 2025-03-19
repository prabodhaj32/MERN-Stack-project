import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export const Login = ({user}) => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(true);

  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const handleSignUp = () => {
    if (!Email || !password) return;
    createUserWithEmailAndPassword(auth, Email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  const handleSignIn = () => {
    if (!Email || !password) return;
    signInWithEmailAndPassword(auth, Email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  if (user) {
    return <Navigate to="/private"></Navigate>;
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSignUpActive ? "Sign Up" : "Sign In"}
        </h2>
        <form className="space-y-4">
          <fieldset className="border border-gray-300 p-4 rounded-md">
            <ul className="space-y-4">
              <li className="flex flex-col">
                <label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={Email}
                  onChange={handleEmailChange}
                  className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
                />
              </li>

              <li className="flex flex-col">
                <label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
                />
              </li>
            </ul>

            {isSignUpActive && (
              <button
                type="button"
                onClick={handleSignUp}
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
            )}

            {!isSignUpActive && (
              <button
                type="button"
                onClick={handleSignIn}
                className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
              >
                Sign In
              </button>
            )}
          </fieldset>
        </form>

        <button
          type="button"
          className="w-full mt-4 text-blue-500 hover:underline"
          onClick={handleMethodChange}
        >
          {isSignUpActive
            ? "Already have an account? Sign In"
            : "New here? Create an account"}
        </button>
      </div>
    </section>
  );
};

export default Login;
