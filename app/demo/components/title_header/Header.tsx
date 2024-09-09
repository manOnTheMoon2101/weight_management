import React from "react";
import Account from "./account/account";
const Header = () => {
  return (
    <div className="flex flex-row justify-end items-baseline border-b-2 bg-purple-900">
      <div className="flex flex-row items-baseline mx-5">
        <Account />
      </div>
    </div>
  );
};

export default Header;
