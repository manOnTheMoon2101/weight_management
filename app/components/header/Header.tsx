import React from "react";
import { NavBar } from "./components/navbar/Navbar";
const Header = () => {
  return (
    <div className="flex flex-row justify-end items-baseline bg-purple-900">
      <div className="flex flex-row items-baseline">
        <NavBar/>
      </div>
    </div>
  );
};

export default Header;
