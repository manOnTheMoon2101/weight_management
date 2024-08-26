import React from "react";
import Account from "./components/account/account";
import ReleaseNotes from "./components/notes/ReleaseNotes";
const Header = () => {
  return (
    <div className="flex flex-row justify-end items-baseline border-b-2 bg-purple-900">
      {/* <div className="fixed bottom-0 right-0 m-4 p-4">
        <ReleaseNotes />
      </div> */}
      <div className="flex flex-row items-baseline mx-5">
        <Account />
      </div>
    </div>
  );
};

export default Header;
