"use client";
import Pills from "./components/CellRenderers/Pills";
import Actions from "./components/CellRenderers/Actions";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sugar from "./components/CellRenderers/Sugar";
import { IoMdRefresh } from "react-icons/io";
import "./components/table.css";
import { IoMdDownload } from "react-icons/io";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Carbs from "./components/CellRenderers/Carbs";
import Fat from "./components/CellRenderers/Fat";
import Calories from "./components/CellRenderers/Calories";
export function Dashboard_table(data: any) {
  const { toast } = useToast();

  const initialRowData = data.data;
  const [rowData, setRowData] = useState(initialRowData);
  const [colDefs, setColDefs] = useState<any>([
    {
      headerName: "Actions",
      cellRenderer: Actions,
      headerClass: "bg-emerald-900 bg-opacity-50 text-center",
      filter: false,
      sort: false,
      sortable: false,
      suppressMovable: true,
      cellStyle: { textAlign: "center" },
      tooltipField: "Actions",
      pinned: "left",
      lockPosition: true,
      headerTooltip: "Manage Data",
    },
    {
      headerName: "Date",
      field: "createdAt",
      filter: true,
      unSortIcon: true,
    },
    { headerName: "Weight", field: "weight", filter: true, unSortIcon: true },
    {
      headerName: "Calories",
      field: "totalCalories",
      filter: true,
      unSortIcon: true,
      cellRenderer: Calories,
      tooltipField: "Calories",
      headerTooltip: "Limit set to 2000",
    },
    {
      headerName: "Protein",
      field: "totalProtein",
      filter: true,
      unSortIcon: true,
      tooltipField: "Protein",
    },
    {
      headerName: "Fat",
      field: "totalFat",
      filter: true,
      unSortIcon: true,
      cellRenderer: Fat,
      tooltipField: "Fat",
      headerTooltip: "Limit set to 78",
    },
    {
      headerName: "Carbs",
      field: "totalCarbs",
      tooltipField: "Sugar",
      cellRenderer: Carbs,
      filter: true,
      unSortIcon: true,
      headerTooltip: "Limit set to 120",
    },
    {
      headerName: "Sugar",
      field: "totalSugar",
      filter: true,
      unSortIcon: true,
      tooltipField: "Sugar",
      cellRenderer: Sugar,
      headerTooltip: "Limit set to 60",
    },
    {
      headerName: "Supplements",
      headerClass: "bg-orange-400 bg-opacity-50",
      children: [
        {
          headerName: "L-Carnitine",
          field: "tookFatburner",
          cellRenderer: Pills,
          headerClass: "bg-green-400 bg-opacity-50",
          filter: true,
          tooltipField: "L-Carnitine",
          headerTooltip: "Fat Burner",
        },
        {
          headerName: "CLA",
          field: "tookWeightmanagement",
          cellRenderer: Pills,
          headerClass: "bg-pink-400 bg-opacity-50",
          filter: true,
          tooltipField: "CLA",
          headerTooltip: "Weight Management",
        },
        {
          headerName: "Vitamin",
          field: "tookVitamin",
          cellRenderer: Pills,
          headerClass: "bg-cyan-400 bg-opacity-50",
          filter: true,
          tooltipField: "Vitamin",
          headerTooltip: "Multi Vitamin",
        },
      ],
    },
  ]);

  const gridRef = useRef<any>(null);

  const exportToCSV = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv();
    }
  };

  const resetState = useCallback(() => {
    gridRef.current!.api.resetColumnState();
    gridRef.current!.api.setFilterModel(null);
    gridRef.current!.api.setRowGroupColumns([]);
    gridRef.current!.api.applyColumnState({ state: colDefs });
    gridRef.current!.api.refreshCells({ force: true });
    console.log("column state reset");
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, []);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRefresh = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  };
  return (
    <div>
      <div className="flex flex-row justify-end mx-2">
        <div className="flex flex-row">
          <div>
            {/* <TableMenu csv={exportToCSV} month={data} ref={gridRef} /> */}
            <Button onClick={exportToCSV} variant="ghost">
              <IoMdDownload />
            </Button>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="text-accent"
                  variant={"ghost"}
                  onClick={() => {
                    handleRefresh();
                    resetState();
                    // toast({
                    //   description: "Succesfully Refreshed!",
                    //   className: "bg-background text-white",
                    // });
                  }}
                >
                  <IoMdRefresh
                    size={20}
                    className={`transition-transform duration-300 ${
                      isSpinning ? "animate-spin" : ""
                    }`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh Data</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Input
            type="text"
            className="bg-background placeholder:text-foreground text-foreground"
            id="filter-text-box"
            placeholder="Search"
            onInput={onFilterTextBoxChanged}
          />
        </div>
      </div>
      <div className="ag-theme-quartz-dark my-2 mx-2" style={{ height: 500 }}>
        <AgGridReact
          ref={gridRef}
          tooltipShowDelay={100}
          rowData={rowData}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
}
