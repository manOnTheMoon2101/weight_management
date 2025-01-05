"use client";
import { CustomCellRendererProps } from "ag-grid-react";
import React from "react";

export default (params: CustomCellRendererProps) => {
  return (
    <p className={params.value > 120 ? "text-red-500" : ""}>{params.value}</p>
  );
};
