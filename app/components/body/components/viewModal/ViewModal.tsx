import React from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import EditButton from "./components/EditButton/EditButton";
const ViewModal = (data: any) => {
  return (
    <div>
      <DialogTitle>{data.x.createdAt}</DialogTitle>
      <DialogDescription>weight:{data.x.weight}</DialogDescription>

      <DeleteButton data={data.x.id} />
      <EditButton />
    </div>
  );
};

export default ViewModal;
