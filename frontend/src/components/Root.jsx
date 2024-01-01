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
      <div className=" border p-2 w-screen flex flex-col items-center mt-3 ">
        <h1 className="text-6xl">StudyHub</h1>
        <div className="italic text-center text-2xl">Your Hub for Learning</div>
      </div>
      <nav className="w-screen flex p-3 justify-end ">
        {isSignedIn ? (
          <button
            className="bg-red-900 text-white px-3"
            onClick={() => {
              dispatch(signout());
              navigate("/signin");
            }}
          >
            Log out
          </button>
        ) : (
          <div className="flex gap-2 ">
            <NavLink to="/signin">
              <span className="bg-green-600 px-2 py-1 text-white">Sign In</span>
            </NavLink>
            <NavLink to="/signup">
              <span className="bg-blue-600 px-2 py-1 text-white">Sign Up</span>
            </NavLink>
          </div>
        )}
      </nav>
      <div className="mt-10">
        <Outlet />
      </div>
    </>
  );
}

export default Root;
