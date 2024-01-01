import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/appSlice";
import { Navigate } from "react-router";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, isSignedIn, isSuccess } = useSelector(
    (state) => state.appSlice
  );

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signUp({ username, email, password }));
    setUsername("");
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

  if (isSuccess) {
    return <Navigate to="/signin" replace={true} />;
  }

  return (
    <div className="max-w-96 m-auto">
      <h1 className="text-center mb-3 text-2xl ">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col border p-3">
        <label htmlFor="username">Username:</label>
        <input
          className="border"
          type="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="mt-3" htmlFor="email">
          Email:
        </label>
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
          className="bg-blue-600 text-white px-3 mt-3 w-fit m-auto"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
