"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = (isChecked: boolean) => {
    const newTheme = isChecked ? "light" : "dark";
    setTheme(newTheme);
  };

  useEffect(() => {
    if (theme === undefined || null) {
      setTheme("light");
    }
  }, []);

  const mode = theme ? "light" : theme ? "dark" : null

  return (
    <div>
      <Switch onCheckedChange={handleThemeToggle} />
    </div>
  );
}
