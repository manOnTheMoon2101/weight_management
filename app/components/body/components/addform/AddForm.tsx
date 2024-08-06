"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
const AddForm  = () => {
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
    e.preventDefault();
    axios
      .post("/api/data", post)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        postData({});
        setOpen(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    postData({
      ...post,
      [name]: type === "checkbox" ? checked : parseFloat(value),
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex flex-row justify-between items-baseline">
   
            <IoMdAddCircleOutline size={35} />
            Add New
 
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Weight:
                <input
                  type="number"
                  name="weight"
                  value={post.weight}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
              </label>
            </div>

            <div>
              <label>
                Took Fatburner:
                <input
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
                <input
                  type="number"
                  name="totalCalories"
                  value={post.totalCalories}
                  onChange={handleChange}
                  step="1"
                  required
                />
              </label>
            </div>

            <div>
              <label>
                Took Weight Management:
                <input
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
                <input
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
                <input
                  type="number"
                  name="totalProtein"
                  value={post.totalProtein}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
              </label>
            </div>

            <div>
              <label>
                Total Fat:
                <input
                  type="number"
                  name="totalFat"
                  value={post.totalFat}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
              </label>
            </div>

            <div>
              <label>
                Total Carbs:
                <input
                  type="number"
                  name="totalCarbs"
                  value={post.totalCarbs}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
              </label>
            </div>

            <div>
              <label>
                Total Sugar:
                <input
                  type="number"
                  name="totalSugar"
                  value={post.totalSugar}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
              </label>
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddForm;
