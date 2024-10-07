"use client";
import { CustomCellRendererProps } from "ag-grid-react";
import React from "react";

export default (params: CustomCellRendererProps) => {
  return <p>{params.value == true ? "💊" : ""}</p>;
};
