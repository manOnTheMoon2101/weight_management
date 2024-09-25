import React from "react";
import Account from "./components/account/account";
const Header = () => {
  return (
    <div className="flex flex-row justify-end items-baseline bg-purple-900">
      <div className="flex flex-row items-baseline">
        <Account />
      </div>
    </div>
  );
};

export default Header;
