"use client";
import { Dashboard } from "./components/body/dashboard/Dashboard";
import Header from "./components/title_header/Header";
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
