import React from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import EditButton from "./components/EditButton/EditButton";
const ViewModal = (data: any) => {
  return (
    <div>
      <DialogTitle>{data.x.createdAt}</DialogTitle>
      <DialogDescription>weight:{data.x.weight}</DialogDescription>
      <DialogDescription>calories:{data.x.totalCalories}</DialogDescription>
      <DialogDescription>protein:{data.x.totalProtein}</DialogDescription>
      <DialogDescription>fat:{data.x.totalFat}</DialogDescription>
      <DialogDescription>carbs:{data.x.totalCarbs}</DialogDescription>
      <DialogDescription>
        sugar:{data.x.totalSugar ? "true" : "false"}
      </DialogDescription>
      <DialogDescription>
        vitamin:{data.x.tookVitamin ? "true" : "false"}
      </DialogDescription>
      <DialogDescription>
        fat burner:{data.x.tookFatburner ? "true" : "false"}
      </DialogDescription>
      <DialogDescription>
        cla:{data.x.tookWeightmanagement ? "true" : "false"}
      </DialogDescription>
      <DeleteButton data={data.x.id} />
      <EditButton />
    </div>
  );
};

export default ViewModal;
