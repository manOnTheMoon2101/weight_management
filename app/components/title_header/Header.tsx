import React from "react";
import Account from "./components/account/account";
import ReleaseNotes from "./components/notes/ReleaseNotes";
const Header = () => {
  return (
    <div className="flex flex-row justify-between items-baseline border-b-4">
      {/* <div className="fixed bottom-0 right-0 m-4 p-4">
        <ReleaseNotes />
      </div> */}
      <div className="flex flex-row items-baseline mx-5">
        {/* <ModeToggle /> */}
        <Account />
      </div>
    </div>
  );
};

export default Header;
