"use client";
import { CustomCellRendererProps } from "ag-grid-react";
import React from "react";
import ViewModal from "../../../modals/viewModal/ViewModal";
export default (params: any) => {
  return (
    <div>
      <ViewModal x={params.data} demo={params.demo} />
    </div>
  );
};
