import React from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import { signIn, signOut } from "next-auth/react";
const Account = () => {
  const { data: session } = useSession();
  return (
    <div>
      <div>{JSON.stringify(session?.user?.name)}</div>
      <div>
        <button onClick={() => signIn()}>Sign in</button>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    </div>
  );
};

export default Account;
