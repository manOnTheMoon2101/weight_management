"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { IoMdSunny } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";
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
      <div className="flex flex-row justify-around items-center">
        <Switch
          onCheckedChange={handleThemeToggle}
          className="data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-primary"
        />
        <h2>
          {theme == "light" ? <IoMdSunny color="yellow" /> : <IoMdMoon />}
        </h2>
      </div>
    </div>
  );
}
