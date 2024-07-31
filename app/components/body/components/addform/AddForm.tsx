"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddForm = () => {
  const [post, postData] = useState<any>({
    tookWeightmanagement: false,
    tookFatburner: false,
    tookVitamin: false,
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

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = parseFloat(e.target.value);
    postData((prevState: any) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex flex-row justify-between items-baseline">
          <Button>
            <IoMdAddCircleOutline size={35} />
            Add New
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div>
              <h3>Weight</h3>
              <Input
                required
                type="number"
                name="weight"
                onChange={handleChange}
                value={post.weight}
              />
            </div>
            <div>
              <h3>Calories</h3>

              <Input
                required
                type="number"
                name="totalCalories"
                onChange={handleChange}
                value={post.totalCalories}
              />
            </div>
            <div>
              <h3>Fat Burner</h3>

              <Switch name="tookFatburner" value={post.tookFatburner} />
              {post.tookFatburner}
            </div>
            <div>
              <h3>CLA</h3>

              <Switch
                name="tookWeightmanagement"
                value={post.tookWeightmanagement}
              />
            </div>
            <div>
              <h3>Vitamin</h3>

              <Switch name="tookVitamin" value={post.tookVitamin} />
            </div>

            <div>
              <h3>Protein</h3>

              <Input
                type="number"
                name="totalProtein"
                onChange={handleChange}
                value={post.totalProtein}
              />
            </div>

            <div>
              <h3>Fat</h3>

              <Input
                type="number"
                name="totalFat"
                onChange={handleChange}
                value={post.totalFat}
              />
            </div>

            <div>
              <h3>Carbohydrates</h3>

              <Input
                type="number"
                name="totalCarbs"
                onChange={handleChange}
                value={post.totalCarbs}
              />
            </div>

            <div>
              <h3>Sugar</h3>

              <Input
                type="number"
                name="totalSugar"
                onChange={handleChange}
                value={post.totalSugar}
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={!post.weight || !post.totalCalories}
              >
                Submit
              </Button>
              {post.weight ? "" : "Weight Required"}
              {post.totalCalories ? "" : "Calories Required"}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddForm;
