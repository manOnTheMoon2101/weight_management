"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
interface Props {
  weight: number;
  tookFatburner: boolean;
  totalCalories: number;
  tookWeightmanagement: boolean;
  tookVitamin: boolean;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  totalSugar: number;
}
const AddForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [post, postData] = useState<any>({
    weight: 0,
    tookFatburner: false,
    totalCalories: 0,
    tookWeightmanagement: false,
    tookVitamin: false,
    totalProtein: 0,
    totalFat: 0,
    totalCarbs: 0,
    totalSugar: 0,
  });
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("/api/data", post)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
        toast({
          description: "Error",
          className: "bg-red-800",
        });
      })
      .finally(() => {
        postData({});
        setLoading(false);
        setOpen(false);
        toast({
          description: "Data has been saved.",
          className: "bg-lime-800",
        });
      });
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    postData({
      ...post,
      [name]: type === "checkbox" ? checked : parseFloat(value),
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="flex flex-row justify-between items-center">
            <IoMdAddCircleOutline size={35} />
            <p>Add New</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Weight:
                <Input
                  type="number"
                  name="weight"
                  value={post.weight}
                  onChange={handleChange}
                  step="0.01"
                />
              </label>
            </div>
            <div>
              <label>
                Took Fatburner:
                <Input
                  type="checkbox"
                  name="tookFatburner"
                  checked={post.tookFatburner}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Total Calories:
                <Input
                  type="number"
                  name="totalCalories"
                  value={post.totalCalories}
                  onChange={handleChange}
                  step="1"
                />
              </label>
            </div>

            <div>
              <label>
                Took Weight Management:
                <Input
                  type="checkbox"
                  name="tookWeightmanagement"
                  checked={post.tookWeightmanagement}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label>
                Took Vitamin:
                <Input
                  type="checkbox"
                  name="tookVitamin"
                  checked={post.tookVitamin}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label>
                Total Protein:
                <Input
                  type="number"
                  name="totalProtein"
                  value={post.totalProtein}
                  onChange={handleChange}
                  step="0.01"
                />
              </label>
            </div>

            <div>
              <label>
                Total Fat:
                <Input
                  type="number"
                  name="totalFat"
                  value={post.totalFat}
                  onChange={handleChange}
                  step="0.01"
                />
              </label>
            </div>

            <div>
              <label>
                Total Carbs:
                <Input
                  type="number"
                  name="totalCarbs"
                  value={post.totalCarbs}
                  onChange={handleChange}
                  step="0.01"
                />
              </label>
            </div>

            <div>
              <label>
                Total Sugar:
                <Input
                  type="number"
                  name="totalSugar"
                  value={post.totalSugar}
                  onChange={handleChange}
                  step="0.01"
                />
              </label>
            </div>

            <Button
              disabled={!post.weight || !post.totalCalories}
              type="submit"
            >
              {loading ? (
                <AiOutlineLoading className="animate-spin text-orange-400 text-lg" />
              ) : (
                "Submit"
              )}
            </Button>
            {post.weight ? "" : "Weight Required"}
            {post.totalCalories ? "" : "Calories Required"}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddForm;
