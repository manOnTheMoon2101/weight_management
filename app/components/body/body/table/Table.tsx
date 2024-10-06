"use client";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import Pills from "./components/CellRenderers/Pills";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdRefresh } from "react-icons/io";
export function Dashboard_table(data: any) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const initialRowData = data.data; // Store the initial data for refreshing
  const [rowData, setRowData] = useState(initialRowData);
  const [colDefs, setColDefs] = useState<any>([
    { headerName: "Actions", field: "id" },
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

  const gridRef = useRef<any>(null);

  const exportToCSV = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv();
    }
  };

  const refreshGrid = () => {
    setRowData(initialRowData);
  };

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
      <div className="flex flex-row justify-end mx-5">
        <Button
          variant={"ghost"}
          onClick={exportToCSV}
          style={{ marginBottom: "10px" }}
        >
          Export to CSV
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => {
            handleRefresh();
            refreshGrid();
          }}
          className={`flex items-center justify-center p-2 rounded-full transition-transform duration-300 ${
            isSpinning ? "animate-spin" : ""
          }`}
        >
          <IoMdRefresh />
        </Button>
        <div>
          <Input
            type="text"
            id="filter-text-box"
            placeholder="Search"
            onInput={onFilterTextBoxChanged}
          />
        </div>
      </div>
      <div className="bg--background border" style={{ height: 500 }}>
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
