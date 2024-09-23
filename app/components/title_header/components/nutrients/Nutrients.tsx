import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AiOutlineLoading } from "react-icons/ai";
const Nutrients = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedProteinValue, setSelectedProteinValue] = useState("");
  const [selectedFatValue, setSelectedFatValue] = useState("");
  const [selectedCarbsValue, setSelectedCarbsValue] = useState("");
  const [selectedSugarValue, setSelectedSugarValue] = useState("");
  const handleToggleChange = (value: any) => {
    setSelectedValue(value);
  };
  const handleProteinToggleChange = (value: any) => {
    setSelectedProteinValue(value);
  };
  const handleFatToggleChange = (value: any) => {
    setSelectedFatValue(value);
  };
  const handleCarbsToggleChange = (value: any) => {
    setSelectedCarbsValue(value);
  };
  const handleSugarToggleChange = (value: any) => {
    setSelectedSugarValue(value);
  };
  if (isDesktop) {
    const x = 90;
    const y = 1;
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Set Nutrients</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form>
            <div className="flex flex-row justify-start">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      {loading ? (
                        <AiOutlineLoading className="animate-spin text-orange-400 text-lg" />
                      ) : (
                        <Button
                          type="submit"
                          className="bg-orange-400 text-slate-50"
                        >
                          <FaSave />
                        </Button>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Save Data</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <div>
                <Label>Calories</Label>
                <div className="flex flex-row items-center">
                  <ToggleGroup
                    type="single"
                    value={selectedValue}
                    onValueChange={handleToggleChange}
                  >
                    <div className="flex flex-col">
                      <ToggleGroupItem value="min" aria-label="Toggle min">
                        min
                      </ToggleGroupItem>
                      <ToggleGroupItem value="max" aria-label="Toggle max">
                        max
                      </ToggleGroupItem>
                    </div>
                  </ToggleGroup>
                  {selectedValue === "min" ? (
                    <Input value={x} />
                  ) : (
                    <Input value={y} />
                  )}
                </div>
              </div>
              <div>
                <Label>Protein</Label>
                <div className="flex flex-row items-center">
                  <ToggleGroup
                    type="single"
                    value={selectedProteinValue}
                    onValueChange={handleProteinToggleChange}
                  >
                    <div className="flex flex-col">
                      <ToggleGroupItem value="min" aria-label="Toggle min">
                        min
                      </ToggleGroupItem>
                      <ToggleGroupItem value="max" aria-label="Toggle max">
                        max
                      </ToggleGroupItem>
                    </div>
                  </ToggleGroup>
                  {selectedProteinValue === "min" ? (
                    <Input value={x} />
                  ) : (
                    <Input value={y} />
                  )}
                </div>
              </div>
              <div>
                <Label>Fat</Label>
                <div className="flex flex-row items-center">
                  <ToggleGroup
                    type="single"
                    value={selectedFatValue}
                    onValueChange={handleFatToggleChange}
                  >
                    <div className="flex flex-col">
                      <ToggleGroupItem value="min" aria-label="Toggle min">
                        min
                      </ToggleGroupItem>
                      <ToggleGroupItem value="max" aria-label="Toggle max">
                        max
                      </ToggleGroupItem>
                    </div>
                  </ToggleGroup>
                  {selectedFatValue === "min" ? (
                    <Input value={x} />
                  ) : (
                    <Input value={y} />
                  )}
                </div>
              </div>
              <div>
                <Label>Carbs</Label>
                <div className="flex flex-row items-center">
                  <ToggleGroup
                    type="single"
                    value={selectedCarbsValue}
                    onValueChange={handleCarbsToggleChange}
                  >
                    <div className="flex flex-col">
                      <ToggleGroupItem value="min" aria-label="Toggle min">
                        min
                      </ToggleGroupItem>
                      <ToggleGroupItem value="max" aria-label="Toggle max">
                        max
                      </ToggleGroupItem>
                    </div>
                  </ToggleGroup>
                  {selectedCarbsValue === "min" ? (
                    <Input value={x} />
                  ) : (
                    <Input value={y} />
                  )}
                </div>
              </div>
              <div>
                <Label>Sugar</Label>
                <div className="flex flex-row items-center">
                  <ToggleGroup
                    type="single"
                    value={selectedSugarValue}
                    onValueChange={handleSugarToggleChange}
                  >
                    <div className="flex flex-col">
                      <ToggleGroupItem value="min" aria-label="Toggle min">
                        min
                      </ToggleGroupItem>
                      <ToggleGroupItem value="max" aria-label="Toggle max">
                        max
                      </ToggleGroupItem>
                    </div>
                  </ToggleGroup>
                  {selectedSugarValue === "min" ? (
                    <Input value={x} />
                  ) : (
                    <Input value={y} />
                  )}
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Nutrients;
