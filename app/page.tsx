"use client";
import { Dashboard } from "./components/body_header/dashboard/Dashboard";
import Header from "./components/title_header/Header";
export default function Home(e: any) {
  return (
    <main>
      <Header />
      <div>
        <Dashboard />
      </div>
    </main>
  );
}
