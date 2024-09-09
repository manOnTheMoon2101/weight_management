"use client";

import { Dashboard_table } from "../table/Table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
export function Dashboard() {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="mx-2 md:">
          <Select>
            <SelectTrigger className="w-[180px] mx-3 border border-orange-400">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="01">January</SelectItem>
              <SelectItem value="02">February</SelectItem>
              <SelectItem value="03">March</SelectItem>
              <SelectItem value="04">April</SelectItem>
              <SelectItem value="05">May</SelectItem>
              <SelectItem value="06">June</SelectItem>
              <SelectItem value="07">July</SelectItem>
              <SelectItem value="08">August</SelectItem>
              <SelectItem value="09">September</SelectItem>
              <SelectItem value="10">October</SelectItem>
              <SelectItem value="11">November</SelectItem>
              <SelectItem value="12">December</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mx-2 md:">{/* <AddForm /> */}</div>
      </div>
      <div className="flex flex-col md:flex-col justify-around  h-full">
        <div className="w-full my-5 md:flex flex-row justify-around overflow-auto  ">
          {/* <ProteinGraph  />
          <WeightGraph  />
          <CalorieGraph  /> */}
        </div>
        <div className="w-full my-5  flex-1">
          <Dashboard_table />
        </div>
      </div>
    </div>
  );
}
