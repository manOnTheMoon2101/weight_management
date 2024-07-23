"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
const AddForm = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [post, postData] = useState<any>({});
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/food");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

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
    const name = e.target.name;
    const value = parseFloat(e.target.value);
    setData((prevState: any) => ({ ...prevState, [name]: value }));
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
                    {!open ? "+" : "loading"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[500px] p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                      <CommandEmpty>No Data Found.</CommandEmpty>
                      <CommandGroup>
                        {data.map((x: any) => (
                          <CommandItem
                            key={x.id}
                            value={x.name}
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
                                value === x.name ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <div className="flex flex-row justify-around items-baseline w-full">
                              <div className="w-1/2 overflow-x-auto text-center">
                                {" "}
                                {x.name}
                              </div>
                              <div className="w-1/2 text-center">
                                {" "}
                                {x.calories}kcal
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
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
