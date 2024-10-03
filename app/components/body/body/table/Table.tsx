"use client";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AiOutlineExport } from "react-icons/ai";
import ViewModal from "../modals/viewModal/ViewModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Cousine } from "next/font/google";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { FaInfoCircle } from "react-icons/fa";
import { TableMenu } from "./components/Menu/Menu";
import { useRef } from "react";
import Pills from "./components/CellRenderers/Pills";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
const cousine = Cousine({
  subsets: ["latin"],
  weight: "400",
});
export function Dashboard_table(data: any) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [rowData, setRowData] = useState(data.data);
  const [colDefs, setColDefs] = useState<any>([
    { headerName: "Date", field: "createdAt" },
    { headerName: "Weight", field: "weight" },
    { headerName: "Calories", field: "totalCalories" },
    { headerName: "Protein", field: "totalProtein" },
    { headerName: "Fat", field: "totalFat" },
    { headerName: "Carbs", field: "totalCarbs" },
    { headerName: "Sugar", field: "totalSugar" },
    { headerName: "L-Carnitine", field: "tookFatburner", cellRenderer: Pills },
    { headerName: "CLA", field: "tookWeightmanagement", cellRenderer: Pills },
    { headerName: "Vitamin", field: "tookVitamin", cellRenderer: Pills },
  ]);
  return (
    <div style={{ height: 500 }}>
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}
