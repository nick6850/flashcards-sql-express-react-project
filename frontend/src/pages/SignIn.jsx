import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/appSlice";
import { Navigate } from "react-router";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, isSignedIn } = useSelector(
    (state) => state.appSlice
  );

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password }));
    setEmail("");
    setPassword("");
  };

  if (error) {
    return error;
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isSignedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="max-w-96 m-auto">
      <h1 className="text-center mb-3 text-2xl">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col border p-3">
        <label htmlFor="email">Email:</label>
        <input
          className="border"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="mt-3" htmlFor="password">
          Password:
        </label>
        <input
          className="border"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="mt-3 bg-green-600 text-white w-fit m-auto px-3"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
