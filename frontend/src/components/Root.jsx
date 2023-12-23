import React from "react";
import { Outlet } from "react-router-dom";
function Root() {
  return (
    <>
      <navbar>Hello</navbar>
      <Outlet />
    </>
  );
}

export default Root;
