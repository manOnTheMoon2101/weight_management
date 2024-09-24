"use client";
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
import useSWR from "swr";
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
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
const Nutrients = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedProteinValue, setSelectedProteinValue] = useState("");
  const [selectedFatValue, setSelectedFatValue] = useState("");
  const [selectedCarbsValue, setSelectedCarbsValue] = useState("");
  const [selectedSugarValue, setSelectedSugarValue] = useState("");
  const { toast } = useToast();
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
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/nutrients`, fetcher);
  const [nutrients, updateNutrients] = useState<any>({
    minCalories: data.map((x: any) => x.minCalories),
    maxCalories: data.map((x: any) => x.maxCalories),
    minProtein: data.map((x: any) => x.minProtein),
    maxProtein: data.map((x: any) => x.maxProtein),
    minFat: data.map((x: any) => x.minFat),
    maxFat: data.map((x: any) => x.maxFat),
    minCarbs: data.map((x: any) => x.minCarbs),
    maxCarbs: data.map((x: any) => x.maxCarbs),
    minSugar: data.map((x: any) => x.minSugar),
    maxSugar: data.map((x: any) => x.maxSugar),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? parseFloat(value) : value;
    updateNutrients((prevPost: any) => ({
      ...prevPost,
      [name]: newValue,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(`/api/nutrients/`, nutrients).then(() => {
        window.location.reload();
        toast({
          description: "Nutrients have been set.",
          className: "bg-lime-800",
        });
      });
      setOpen(false);
    } catch (error) {
    } finally {
      updateNutrients({});
      setLoading(false);
      setOpen(false);
      toast({
        description: "Data has been saved.",
        className: "bg-lime-800",
      });
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger disabled={true} asChild>
          <h3 className="text-center cursor-pointer">Set Nutrients</h3>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {data.map((x: any) => (
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
                      <Input value={x.minCalories} />
                    ) : (
                      <Input value={x.maxCalories} />
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
                      <Input value={x.minProtein} />
                    ) : (
                      <Input value={x.maxProtein} />
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
                      <Input value={x.minFat} />
                    ) : (
                      <Input value={x.maxFat} />
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
                      <Input value={x.minCarbs} />
                    ) : (
                      <Input value={x.maxCarbs} />
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
                      <Input value={x.minSugar} />
                    ) : (
                      <Input value={x.maxSugar} />
                    )}
                  </div>
                </div>
              </div>
            </form>
          ))}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <h3 className="text-center cursor-pointer">Set Nutrients</h3>
      </DialogTrigger>
      <DrawerContent>
        {data.map((x: any) => (
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
                    <Input value={x.minCalories} />
                  ) : (
                    <Input value={x.maxCalories} />
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
                    <Input value={x.minProtein} />
                  ) : (
                    <Input value={x.maxCalories} />
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
                    <Input value={x.minFat} />
                  ) : (
                    <Input value={x.maxFat} />
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
                    <Input value={x.minCarbs} />
                  ) : (
                    <Input value={x.maxCarbs} />
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
                    <Input value={x.minSugar} />
                  ) : (
                    <Input value={x.maxSugar} />
                  )}
                </div>
              </div>
            </div>
          </form>
        ))}
      </DrawerContent>
    </Drawer>
  );
};

export default Nutrients;
