import React from "react";
import { Outlet, NavLink } from "react-router-dom";
function Root() {
  return (
    <>
      <nav>
        <NavLink to="/signin">Sign In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default Root;
