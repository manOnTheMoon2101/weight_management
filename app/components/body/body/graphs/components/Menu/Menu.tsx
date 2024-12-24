"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import months from "@/lib/files/months.json";
import { CiExport } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
import html2canvas from "html2canvas";
import { PiFilePng } from "react-icons/pi";
import jsPDF from "jspdf";
export function GraphMenu(chartRef: any) {
  function getMonthName(value: any) {
    const month = months.find((month) => month.value === value);
    return month ? month.name : null;
  }
  const downloadImage = async () => {
    if (chartRef.chartRef.current) {
      const canvas = await html2canvas(chartRef.chartRef.current);
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${getMonthName(chartRef.month) + " " + chartRef.title}`;
      link.click();
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-accent">
          <MdMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background">
        <DropdownMenuLabel>{getMonthName(chartRef.month)}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button
              variant={"ghost"}
              className="w-full"
              onClick={downloadImage}
            >
              <PiFilePng className="mr-2 h-4 w-4" />
              Save as Image
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
