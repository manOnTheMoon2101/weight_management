import React from "react";
import Account from "./components/account/account";
import { ModeToggle } from "./components/theme/toggle";

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-baseline">
      <div>
        <h4>Weight Management App</h4>
      </div>
      <div>
        <Account />
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
