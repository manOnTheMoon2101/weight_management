"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdDelete } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
const DeleteButton = (id: any) => {
  const { toast } = useToast();
  const handleDeletePost = (id: any) => {
    axios
      .patch(`/api/nutrients/delete/${id}`)
      .then((res: any) => {
        toast({
          description: "Data has been Deleted.",
          className: "bg-red-800",
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="ghost">
            <Delete className="text-red-500 mx-2" size={24} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeletePost(id.data)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteButton;
