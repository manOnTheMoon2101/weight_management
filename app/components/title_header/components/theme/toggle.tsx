"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { FaRegSun } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";
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

  return (
    <div>
      <div className="flex flex-row justify-around items-center mt-5">
        <Switch onCheckedChange={handleThemeToggle} />
        <h2>{theme == "light" ? <FaRegSun /> : <FaRegMoon />}</h2>
      </div>
    </div>
  );
}
