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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AddForm = () => {
  const [open, setOpen] = useState<any>(false);
  const [value, setValue] = useState<any>([]);
  const [data, setData] = useState<any>([]);

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
      <Dialog>
        <DialogTrigger><Button><IoMdAddCircleOutline />Add</Button></DialogTrigger>
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
                    <CommandInput placeholder="Search food..." />
                  </Command>
                </PopoverContent>
              </Popover>
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

export default AddForm;
