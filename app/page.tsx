"use client";

import Image from "next/image";
import axios from "axios";
import Header from "./components/title_header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Body_Header from "./components/body_header/main";
export default function Home(e: any) {
  return (
    <main>
      <Header />
      <div>
        <Body_Header month />
      </div>
      <div>
        <Dashboard month={"07"} />
      </div>
    </main>
  );
}
