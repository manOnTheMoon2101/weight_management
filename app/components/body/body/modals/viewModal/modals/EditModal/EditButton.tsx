"use client";
import React from "react";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
export function EditButton(data: any) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [post, postData] = useState<any>({
    weight: data.data.x.weight,
    tookFatburner: data.data.x.tookFatburner,
    totalCalories: data.data.x.totalCalories,
    tookWeightmanagement: data.data.x.tookWeightmanagement,
    tookVitamin: data.data.x.tookVitamin,
    totalProtein: data.data.x.totalProtein,
    totalFat: data.data.x.totalFat,
    totalCarbs: data.data.x.totalCarbs,
    totalSugar: data.data.x.totalSugar,
  });
  const [open, setOpen] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? parseFloat(value) : value;
    postData((prevPost: any) => ({
      ...prevPost,
      [name]: newValue,
    }));
  };
  const handleSwitchChange = (name: any, checked: any) => {
    postData({
      ...post,
      [name]: checked,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios
        .patch(`/api/nutrients/edit/${data.data.x.id}`, post)
        .then(() => {
          window.location.reload();
          toast({
            description: "Data has been saved.",
            className: "bg-lime-800",
          });
        });
      setOpen(false);
    } catch (error) {
    } finally {
      postData({});
      setLoading(false);
      setOpen(false);
      toast({
        description: "Data has been saved.",
        className: "bg-lime-800",
      });
    }
  };
  if (isDesktop) {
    return (
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <div className="flex flex-row justify-between items-center mx-2">
              <Button variant="ghost">
                <MdEditNote
                  size={30}
                  className="text-orange-400"
                  onClick={() => setOpen(true)}
                />
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row justify-start">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        {loading ? (
                          <AiOutlineLoading className="animate-spin text-orange-400 text-lg" />
                        ) : (
                          <Button
                            variant={"ghost"}
                            disabled={!post.weight || !post.totalCalories}
                            type="submit"
                          >
                            <FaSave size={20} className="text-orange-400" />
                          </Button>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Save Data</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex flex-row justify-around">
                <div className="flex flex-col justify-center items-center m-2">
                  <div className="my-2">
                    <Label className="text-center mb-2 text-xl">Weight</Label>
                    <Input
                      type="number"
                      name="weight"
                      value={post.weight}
                      className="border-orange-400"
                      step="0.01"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="my-2">
                    {" "}
                    <Label className="text-center mb-2 text-xl">Calories</Label>
                    <Input
                      type="number"
                      name="totalCalories"
                      className="border-orange-400"
                      value={post.totalCalories}
                      step="1"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center m-2">
                  <div className="flex flex-col justify-center items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label className="text-center cursor-help mb-2 text-xl">
                            L-C
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Fat Burner</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Switch
                      name="tookFatburner"
                      checked={post.tookFatburner}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("tookFatburner", checked)
                      }
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label className="text-center cursor-help mb-2 text-xl">
                            CLA
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>(Conjugated linoleic acid)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Switch
                      name="tookWeightmanagement"
                      checked={post.tookWeightmanagement}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("tookWeightmanagement", checked)
                      }
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Label className="text-center cursor-help mb-2 text-xl">
                            VIT
                          </Label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Vitamin</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Switch
                      name="tookVitamin"
                      checked={post.tookVitamin}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("tookVitamin", checked)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center mb-5">
                <div className="text-center mx-2">
                  <Label className="text-center mb-2 text-xl">Protein</Label>
                  <Input
                    type="number"
                    name="totalProtein"
                    value={post.totalProtein}
                    step="0.01"
                    onChange={handleChange}
                  />
                </div>

                <div className="text-center mx-2">
                  <Label className="text-xl mb-2">Fat</Label>
                  <Input
                    type="number"
                    name="totalFat"
                    value={post.totalFat}
                    step="0.01"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center items-center mb-5">
                <div className="text-center mx-2">
                  <Label className="text-xl">Carbs</Label>
                  <Input
                    type="number"
                    name="totalCarbs"
                    value={post.totalCarbs}
                    step="0.01"
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center mx-2">
                  <Label className="text-xl">Sugar</Label>
                  <Input
                    type="number"
                    name="totalSugar"
                    value={post.totalSugar}
                    step="0.01"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
            <div className="flex flex-row justify-end">
              <Badge>{data.data.x.createdAt}</Badge>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <div className="flex flex-row justify-between items-center mx-2">
            <Button variant="ghost">
              <MdEditNote
                size={30}
                className="text-orange-400"
                onClick={() => setOpen(true)}
              />
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-start">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      {loading ? (
                        <AiOutlineLoading className="animate-spin text-orange-400 text-lg" />
                      ) : (
                        <Button
                          disabled={!post.weight || !post.totalCalories}
                          type="submit"
                          variant={"ghost"}
                        >
                          <FaSave size={20} className="text-orange-400" />
                        </Button>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Save Data</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex flex-row justify-around">
              <div className="flex flex-col justify-center items-center m-2">
                <div className="my-2">
                  <Label className="text-center mb-2 text-xl">Weight</Label>
                  <Input
                    type="number"
                    name="weight"
                    value={post.weight}
                    className="border-orange-400"
                    step="0.01"
                    onChange={handleChange}
                  />
                </div>
                <div className="my-2">
                  {" "}
                  <Label className="text-center mb-2 text-xl">Calories</Label>
                  <Input
                    type="number"
                    name="totalCalories"
                    className="border-orange-400"
                    value={post.totalCalories}
                    step="1"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center m-2">
                <div className="flex flex-col justify-center items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="text-center cursor-help mb-2 text-xl">
                          L-C
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Fat Burner</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Switch
                    name="tookFatburner"
                    checked={post.tookFatburner}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("tookFatburner", checked)
                    }
                  />
                </div>

                <div className="flex flex-col justify-center items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="text-center cursor-help mb-2 text-xl">
                          CLA
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>(Conjugated linoleic acid)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Switch
                    name="tookWeightmanagement"
                    checked={post.tookWeightmanagement}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("tookWeightmanagement", checked)
                    }
                  />
                </div>

                <div className="flex flex-col justify-center items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="text-center cursor-help mb-2 text-xl">
                          VIT
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Vitamin</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Switch
                    name="tookVitamin"
                    checked={post.tookVitamin}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("tookVitamin", checked)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center mb-5">
              <div className="text-center mx-2">
                <Label className="text-center mb-2 text-xl">Protein</Label>
                <Input
                  type="number"
                  name="totalProtein"
                  value={post.totalProtein}
                  step="0.01"
                  onChange={handleChange}
                />
              </div>

              <div className="text-center mx-2">
                <Label className="text-xl mb-2">Fat</Label>
                <Input
                  type="number"
                  name="totalFat"
                  value={post.totalFat}
                  step="0.01"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-row justify-center items-center mb-5">
              <div className="text-center mx-2">
                <Label className="text-xl">Carbs</Label>
                <Input
                  type="number"
                  name="totalCarbs"
                  value={post.totalCarbs}
                  step="0.01"
                  onChange={handleChange}
                />
              </div>
              <div className="text-center mx-2">
                <Label className="text-xl">Sugar</Label>
                <Input
                  type="number"
                  name="totalSugar"
                  value={post.totalSugar}
                  step="0.01"
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
          <div className="flex flex-row justify-end">
            <Badge>{data.data.x.createdAt}</Badge>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
