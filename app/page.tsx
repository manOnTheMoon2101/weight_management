"use client";
import { Dashboard } from "./components/body/dashboard/Dashboard";
import Graph from "./components/body/graphs/Graph";
import Header from "./components/title_header/Header";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home(e: any) {
  const { toast } = useToast();
  const { data: session } = useSession();
  const name = JSON.stringify(session?.user?.name)
    ? JSON.stringify(session?.user?.name)
    : null;
  // useEffect(() => {
  //   // Check if the user is logged in and the name is available
  //   if (session?.user?.name) {
  //     toast({
  //       title: `Welcome, ${name}!`,
  //       duration: 5000,
  //     });
  //   }
  // }, [session, toast]);
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("welcome")) {
      toast({
        description: `Welcome ${name}`,
        className: "bg-lime-800",
      });
      const url = new URL(window.location.href);
      url.searchParams.delete("welcome");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);
  return (
    <main>
      <div className="mb-5">
        <Header />
      </div>
      <div className="flex h-screen">
        <div className="w-[30%] max-h-[50vh] overflow-auto">
          <Graph />
        </div>
        <div className="w-[70%] h-full">
          <Dashboard />
        </div>
      </div>
    </main>
  );
}
