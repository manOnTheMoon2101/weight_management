"use client";
import React from "react";
import { CalendarForm } from "./components/calendar/calendar";
import AddForm from "./components/addform/AddForm";

const Filter = () => {
  return (
    <div className="flex flex-row justify-between">
      <CalendarForm />
      <AddForm />
    </div>
  );
};

export default Filter;
