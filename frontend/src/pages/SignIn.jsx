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
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
