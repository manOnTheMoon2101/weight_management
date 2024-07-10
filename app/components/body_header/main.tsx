"use client";
import React from "react";
import { Data_Filter } from "./components/filter/Data_Filter";
import AddForm from "./components/addform/AddForm";
import { useState } from "react";
const Filter = (month:any) => {
  const [customVariable, setCustomVariable] = useState(month);
  return (
    <div className="flex flex-row justify-between">
      <Data_Filter month='07' />
      <AddForm />
    </div>
  );
};

export default Filter;
