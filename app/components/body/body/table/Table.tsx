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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export function Dashboard_table(data: any) {
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
    },
    {
      headerName: "Protein",
      field: "totalProtein",
      filter: true,
      unSortIcon: true,
      cellClassRules: {
        "text-red-400": (params: { value: any }) => params.value < 90,
      },
    },
    {
      headerName: "Fat",
      field: "totalFat",
      filter: true,
      unSortIcon: true,
      cellClassRules: {
        "text-red-400": (params: { value: any }) => params.value > 78,
      },
    },
    {
      headerName: "Carbs",
      field: "totalCarbs",
      filter: true,
      unSortIcon: true,
      cellClassRules: {
        "text-red-400": (params: { value: any }) => params.value > 120,
      },
    },
    {
      headerName: "Sugar",
      field: "totalSugar",
      filter: true,
      unSortIcon: true,
      cellClassRules: {
        "text-red-400": (params: { value: any }) => params.value > 60,
      },
    },
    {
      headerName: "L-Carnitine",
      field: "tookFatburner",
      cellRenderer: Pills,
      headerClass: "bg-orange-400 bg-opacity-50",
      filter: true,
    },
    {
      headerName: "CLA",
      field: "tookWeightmanagement",
      cellRenderer: Pills,
      headerClass: "bg-orange-400 bg-opacity-50",
      filter: true,
    },
    {
      headerName: "Vitamin",
      field: "tookVitamin",
      cellRenderer: Pills,
      headerClass: "bg-orange-400 bg-opacity-50",
      filter: true,
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
            id="filter-text-box"
            placeholder="Search"
            onInput={onFilterTextBoxChanged}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    handleRefresh();
                    resetState();
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
              <TooltipContent className="">Refresh Data</TooltipContent>
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
          rowData={rowData}
          columnDefs={colDefs}
          cellSelection={true}
        />
      </div>
    </div>
  );
}
