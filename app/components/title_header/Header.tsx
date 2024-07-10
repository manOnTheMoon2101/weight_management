import React from "react";
import Logout from "./components/Logout";

const Header = () => {
  return (
    <div className="flex flex-row bg-red-200 justify-between items-baseline">
      <div>
        <h4>Weight Management App</h4>
      </div>
      <div>
        <Logout />
      </div>
    </div>
  );
};

export default Header;
