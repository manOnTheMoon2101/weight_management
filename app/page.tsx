"use client";

import Image from "next/image";
import axios from "axios";
import Header from "./components/header/Header";
import Dashboard from "./components/dashboard/Dashboard";

export default function Home(e: any) {
  return (
    <main>
      <Header/>
      <div>
        <Dashboard></Dashboard>
      </div>
    </main>
  );
}
