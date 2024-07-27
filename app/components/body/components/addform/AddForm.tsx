"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { IoMdAddCircleOutline } from "react-icons/io";

import { useRouter } from "next/navigation";
const AddForm = () => {
  const [post, postData] = useState<any>({});
  const [data, setData] = useState<any>([]);

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("/api/data", data)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setData({});
        console.log(data);
        router.refresh();
      });
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    setData(value);
  };

  // reffernce this form
  //   <form onSubmit={handleSubmit}>
  //   <div className={styles.leftDiv}>
  //     <div>
  //       <h3>Weight</h3>
  //       <input
  //         required
  //         type="number"
  //         name="weight"
  //         onChange={handleChange}
  //         value={data.weight || ""}
  //       />
  //     </div>
  //     <div>
  //       <h3>Workout Days</h3>

  //       <input
  //         required
  //         type="number"
  //         name="days"
  //         onChange={handleChange}
  //         value={data.days || ""}
  //       />
  //     </div>

  //     <h3>Lost Weight?</h3>

  //     <div className={styles.checkboxCon}>
  //       <input
  //         id="checkbox"
  //         type="checkbox"
  //         name="lostWeight"
  //         defaultChecked={!isChecked}
  //         onChange={handleCheckboxChange}
  //       />
  //     </div>
  //   </div>

  //   <div className={styles.rightDiv}>
  //     <h3>Info</h3>
  //     <input
  //       name="info"
  //       onChange={handleChangeString}
  //       value={data.info || ""}
  //     />
  //   </div>
  //   <div className={styles.submitButton}>
  //     <button type="submit">Submit</button>
  //   </div>
  // </form>

  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex flex-row justify-between items-baseline">
          <IoMdAddCircleOutline />
          Add
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div>
              <h3>Weight</h3>
              <input
                required
                type="number"
                name="weight"
                onChange={handleChange}
                value={post.weight}
              />
            </div>
            <div>
              <h3>Workout Days</h3>

              <input
                required
                type="number"
                name="days"
                onChange={handleChange}
                value={post.totalCalories}
              />
            </div>

            <div>
              <h3>Calories</h3>

              <input
                required
                type="number"
                name="days"
                onChange={handleChange}
                value={post.totalCalories}
              />
            </div>
            <div>
              <h3>Fat Burner</h3>

        <Switch/>
            </div>
            <div>
              <h3>CLA</h3>

              <Switch/>
            </div>
            <div>
              <h3>Vitamin</h3>

              <Switch/>
            </div>

            <div>
              <h3>Protein</h3>

              <input
                required
                type="number"
                name="days"
                onChange={handleChange}
                value={post.totalCalories}
              />
            </div>

            <div>
              <h3>Fat</h3>

              <input
                required
                type="number"
                name="days"
                onChange={handleChange}
                value={post.totalCalories}
              />
            </div>

            <div>
              <h3>Carbohydrates</h3>

              <input
                required
                type="number"
                name="days"
                onChange={handleChange}
                value={post.totalCalories}
              />
            </div>

            <div>
              <h3>Sugar</h3>

              <input
                required
                type="number"
                name="days"
                onChange={handleChange}
                value={post.totalCalories}
              />
            </div>

            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddForm;
