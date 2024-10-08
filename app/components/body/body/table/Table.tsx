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
export function Dashboard_table(data: any) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const initialRowData = data.data;
  const [rowData, setRowData] = useState(initialRowData);
  const [colDefs, setColDefs] = useState<any>([
    {
      headerName: "Actions",
      cellRenderer: Actions,
      headerClass: "bg-purple-900 bg-opacity-50",
      filter: false,
    },
    { headerName: "Date", field: "createdAt", filter: true,unSortIcon: true  },
    { headerName: "Weight", field: "weight", filter: true,unSortIcon: true  },
    { headerName: "Calories", field: "totalCalories", filter: true ,unSortIcon: true },
    { headerName: "Protein", field: "totalProtein", filter: true,unSortIcon: true  },
    { headerName: "Fat", field: "totalFat", filter: true,unSortIcon: true  },
    { headerName: "Carbs", field: "totalCarbs", filter: true,unSortIcon: true  },
    { headerName: "Sugar", field: "totalSugar", filter: true ,unSortIcon: true },
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
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <Input
            type="text"
            id="filter-text-box"
            placeholder="Search"
            onInput={onFilterTextBoxChanged}
          />
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
        </div>
        <div>
          <TableMenu csv={exportToCSV} month={data} ref={gridRef} />
        </div>
      </div>
      <div className="ag-theme-quartz-dark my-2" style={{ height: 500 }}>
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
