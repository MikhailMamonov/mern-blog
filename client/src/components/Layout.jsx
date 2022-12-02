import React, { Fragment } from "react";
import { NavBar } from "./NavBar";

export const Layout = ({ children }) => {
  return (
    <Fragment>
      <div>
        <NavBar />
        {children}
      </div>
    </Fragment>
  );
};
