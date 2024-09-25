"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { MenubarDemo } from "../menu/MenuBar";
const Account = () => {
  const { data: session } = useSession();
  const name = session?.user?.name || null;
  const cleanedName = name ? name.replace(/^"(.*)"$/, "$1") : null;
  return (
    <div>
      <MenubarDemo/>
    </div>
  );
};

export default Account;
