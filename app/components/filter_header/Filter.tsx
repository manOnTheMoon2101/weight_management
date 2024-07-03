"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DataType {
  id: string;
  name: string;
}
const Filter = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState<DataType[]>([]);

  console.log(value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      Filter
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Weight:</DialogTitle>
            <DialogDescription>
              <Input placeholder="Weight" />
            </DialogDescription>
            <DialogDescription>
              <Switch />
              <Label>Worked out?</Label>
            </DialogDescription>
            <DialogTitle>Select Food:</DialogTitle>
            <DialogDescription>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                  >
                    +
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                      <CommandEmpty>No Data Found.</CommandEmpty>
                      <CommandGroup>
                        {data.map((framework) => (
                          <CommandItem
                            key={framework.id}
                            value={framework.name}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === framework.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {framework.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {value}
            </DialogDescription>
          </DialogHeader>
          <DialogDescription>
            <Switch />
            <Label>Vitamin?</Label>
          </DialogDescription>
          <DialogDescription>
            <Switch />
            <Label>CLA?</Label>
          </DialogDescription>
          <DialogDescription>
            <Switch />
            <Label>L-Carnitine?</Label>
          </DialogDescription>
          <DialogDescription>
            <h3>Protein:</h3>
            <h3>Fat:</h3>
            <h3>Sugar:</h3>
            <h3>Carbs:</h3>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Filter;
