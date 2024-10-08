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
import { PiFileCsv } from "react-icons/pi";
import { PiFilePdf } from "react-icons/pi";
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
  const downloadPdf = async () => {
    if (chartRef.chartRef.current) {
      const canvas = await html2canvas(chartRef.chartRef.current);
      const dataUrl = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(dataUrl, "PNG", 10, position, imgWidth, imgHeight);
      position += heightLeft;

      if (heightLeft >= pageHeight) {
        pdf.addPage();
        pdf.addImage(dataUrl, "PNG", 10, position, imgWidth, imgHeight);
      }

      // Save the PDF
      pdf.save("download.pdf");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-orange-400" variant="ghost">
          <MdMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{getMonthName(chartRef.month)}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Team</span>
          </DropdownMenuItem> */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <CiExport className="mr-2 h-4 w-4" />
              <span>Export</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Button variant={"ghost"} onClick={downloadImage}>
                    <PiFilePng className="mr-2 h-4 w-4" />
                    PNG
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <PiFileCsv className="mr-2 h-4 w-4" />
                  <span>CSV</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant={"ghost"} onClick={downloadPdf}>
                    <PiFilePdf className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
