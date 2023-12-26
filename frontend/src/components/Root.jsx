import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { signout } from "../redux/appSlice";
function Root() {
  const navigate = useNavigate();
  const { isSignedIn } = useSelector((state) => state.appSlice);
  const dispatch = useDispatch();

  return (
    <>
      <nav className="w-screen flex justify-end gap-2 p-3">
        {isSignedIn ? (
          <button
            onClick={() => {
              dispatch(signout());
              navigate("/signin");
            }}
          >
            Log out
          </button>
        ) : (
          <>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </nav>
      <Outlet />
    </>
  );
}

export default Root;
