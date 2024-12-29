"use client";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import Pills from "./components/CellRenderers/Pills";
import Actions from "./components/CellRenderers/Actions";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdRefresh } from "react-icons/io";
import { TableMenu } from "./components/Menu/Menu";
import "./components/table.css";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export function Dashboard_table(data: any) {
  const { toast } = useToast();

  const initialRowData = data.data;
  const [rowData, setRowData] = useState(initialRowData);
  const [colDefs, setColDefs] = useState<any>([
    {
      headerName: "Actions",
      cellRenderer: Actions,
      headerClass: "bg-purple-900 bg-opacity-50 text-center",
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
      cellClassRules: {
        "text-red-400": (params: { value: any }) => params.value > 2000,
      },
      tooltipField: "Calories",
      headerTooltip: "Limit set to 2000",
    },
    {
      headerName: "Protein",
      field: "totalProtein",
      filter: true,
      unSortIcon: true,
      cellClassRules: {
        "text-red-400": (params: { value: any }) => params.value < 90,
      },
      tooltipField: "Protein",
      headerTooltip: "Minimum set to 90",
    },
    {
      headerName: "Fat",
      field: "totalFat",
      filter: true,
      unSortIcon: true,
      cellClassRules: {
        "text-red-400": (params: { value: any }) => params.value > 78,
      },
      tooltipField: "Fat",
      headerTooltip: "Limit set to 78",
    },
    {
      headerName: "Carbs",
      field: "totalCarbs",
      filter: true,
      unSortIcon: true,
      cellClassRules: {
        "text-red-400": (params: { value: any }) => params.value > 120,
      },
      tooltipField: "Carbs",
      headerTooltip: "Limit set to 120",
    },
    {
      headerName: "Sugar",
      field: "totalSugar",
      filter: true,
      unSortIcon: true,
      cellClassRules: {
        "text-red-400": (params: { value: any }) => params.value > 60,
      },
      tooltipField: "Sugar",
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
      <div className="flex flex-row justify-between mx-2">
        <div className="flex flex-row">
          <Input
            type="text"
            className="bg-background placeholder:text-foreground text-foreground"
            id="filter-text-box"
            placeholder="Search"
            onInput={onFilterTextBoxChanged}
          />
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
        </div>
        <div>
          <TableMenu csv={exportToCSV} month={data} ref={gridRef} />
        </div>
      </div>
      <div className="ag-theme-quartz-dark my-2 mx-2" style={{ height: 500 }}>
        <AgGridReact
          ref={gridRef}
          tooltipShowDelay={100}
          rowData={rowData}
          columnDefs={colDefs}
          cellSelection={true}
        />
      </div>
    </div>
  );
}
