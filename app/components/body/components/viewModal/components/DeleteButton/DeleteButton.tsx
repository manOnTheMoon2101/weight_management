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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
const DeleteButton = (id: any) => {
  const { toast } = useToast();
  const handleDeletePost = (id: any) => {
    axios
      .patch(`/api/delete/${id}`)
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
      .finally(() => {
      });
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="bg-red-900 text-slate-50">Delete</Button>
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
