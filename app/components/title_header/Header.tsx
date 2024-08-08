import React from "react";
import Account from "./components/account/account";
import { ModeToggle } from "./components/theme/toggle";
import ReleaseNotes from "./components/notes/ReleaseNotes";
const Header = () => {
  return (
    <div className="flex flex-row justify-between items-baseline border-b-4">
      <div>{/* <h1 className="text-4xl">Weight Management App</h1> */}</div>
      <div className="fixed bottom-0 right-0 m-4 p-4">
        <ReleaseNotes />
      </div>
      <div className="flex flex-row items-baseline">
        {/* <ModeToggle /> */}
        <Account />
      </div>
    </div>
  );
};

export default Header;
