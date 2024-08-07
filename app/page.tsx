"use client";
import { Dashboard } from "./components/body/dashboard/Dashboard";
import Graph from "./components/body/graphs/Graph";
import Header from "./components/title_header/Header";
export default function Home(e: any) {
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
