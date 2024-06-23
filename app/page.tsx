"use client";

import Image from "next/image";
import axios from "axios";
import Header from "./components/header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Filter from "./components/filter_header/Filter";

export default function Home(e: any) {
  return (
    <main>
      <Header/>
      <div>
        <Filter/>
      </div>
      <div>
        <Dashboard></Dashboard>
      </div>
    </main>
  );
}
