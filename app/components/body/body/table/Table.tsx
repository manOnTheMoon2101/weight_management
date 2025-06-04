"use client";
import Pills from "./components/CellRenderers/Pills";
import Actions from "./components/CellRenderers/Actions";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdRefresh } from "react-icons/io";
import "./components/table.css";
import { useToast } from "@/components/ui/use-toast";
import { Download } from "lucide-react";
import { Search } from "lucide-react";
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
      cellRendererParams: {
        demo : data.demo
      },
      headerClass: "bg-accent bg-opacity-50 text-center",
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
      tooltipField: "Calories",
      headerTooltip: "Limit set to 2000",
      cellClass: (params: any) => {
        return params.value > 2000 ? 'bg-red-400' : '';
      },
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
      tooltipField: "Fat",
      headerTooltip: "Limit set to 78",
      cellClass: (params: any) => {
        return params.value > 78 ? 'bg-red-400' : '';
      },
    },
    {
      headerName: "Carbs",
      field: "totalCarbs",
      tooltipField: "Sugar",
      filter: true,
      unSortIcon: true,
      headerTooltip: "Limit set to 120",
      cellClass: (params: any) => {
        return params.value > 120 ? 'bg-red-400' : '';
      },
    },
    {
      headerName: "Sugar",
      field: "totalSugar",
      filter: true,
      unSortIcon: true,
      tooltipField: "Sugar",
      headerTooltip: "Limit set to 60",
      cellClass: (params: any) => {
        return params.value > 60 ? 'bg-red-400' : '';
      },
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
            


            <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
              <Button onClick={exportToCSV} variant="ghost">
              <Download size={20}/>
            </Button>
              </TooltipTrigger>
              <TooltipContent>Export</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          </div>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="text-accent"
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
              <TooltipContent>Refresh</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="relative flex items-center">
            <div className="absolute left-2">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="text"
              className="bg-background placeholder:text-foreground text-foreground pl-8"
              id="filter-text-box"
              placeholder="Search"
              onInput={onFilterTextBoxChanged}
            />
          </div>
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
