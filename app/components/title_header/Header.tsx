import React from "react";
import Logout from "./components/Logout";

const Header = () => {
  return (
    <div className="flex flex-row bg-red-200 justify-around">
      <div>
        <h1>Header Name</h1>
        <h3>made by @cleveclayton</h3>
        <h4>testing</h4>
      </div>
      <div>
        <Logout/>
      </div>
      <div>
        <ul className="flex flex-row justify-around">
          <li className="px-6">Home</li>
          <li className="px-6">Graphs</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
