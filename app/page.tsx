"use client";

import Image from "next/image";
import axios from "axios";
import Header from "./components/title_header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Filter from "./components/body_header/Filter";

export default function Home(e: any) {
  return (
    <main>
      <Header />
      <div>
        <Filter />
      </div>
      <div>
        <Dashboard></Dashboard>
      </div>
    </main>
  );
}
