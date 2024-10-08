"use client";
import { CustomCellRendererProps } from "ag-grid-react";
import React from "react";
import { Button } from "@/components/ui/button";
import ViewModal from "../../../modals/viewModal/ViewModal";
export default (params: CustomCellRendererProps) => {
  return (
    <div>
      <ViewModal x={params.data} />
    </div>
  );
};
