"use client";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

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
export function TableMenu(csv: any) {
  function getMonthName(value: any) {
    const month = months.find((month) => month.value === value);
    return month ? month.name : null;
  }
  // const downloadImage = async () => {
  //   if (ref.ref.current) {
  //     const canvas = await html2canvas(ref.ref.current);
  //     const dataUrl = canvas.toDataURL("image/png");
  //     const link = document.createElement("a");
  //     link.href = dataUrl;
  //     link.download = "calories-chart.png";
  //     link.click();
  //   }
  // };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-orange-400" variant="ghost">
          <MdMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{getMonthName(csv.month.month)}</DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <CiExport className="mr-2 h-4 w-4" />
              <span>Export</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <Button disabled  variant={"ghost"}>
                    PNG
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <Button onClick={csv.csv} variant={"ghost"}>
                    CSV
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>PDF</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
