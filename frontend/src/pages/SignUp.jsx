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

  return (
    <div>
      <h1>Sign Up</h1>
      <button type="button" className="slick-next ">
        Next
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
