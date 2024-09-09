"use client";
import Header from "../demo/components/title_header/Header";
import { Dashboard } from "./components/dashboard/Dashboard";
export default function Home(e: any) {
  return (
    <main>
      <div className="mb-5">
        <Header />
      </div>
      <div>
      <Dashboard />
      </div>
    </main>
  );
}
