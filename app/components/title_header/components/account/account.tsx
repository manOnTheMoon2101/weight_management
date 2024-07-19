import React from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import { signIn, signOut } from "next-auth/react";
const Account = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-row jusytify-around items-baseline">
      <div>{JSON.stringify(session?.user?.name)}</div>
      <div>
        {/* <button onClick={() => signIn()}>Sign in</button> */}
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    </div>
  );
};

export default Account;
