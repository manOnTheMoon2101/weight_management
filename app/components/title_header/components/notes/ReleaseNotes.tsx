import React from "react";
import { TbNotes } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NoteModal from "./components/NoteModal";
const ReleaseNotes = () => {
  const notes: any = {
    version1: {
      title: "0.5",
      details: "still in beta!!!full release in middle of august.",
      features: [
        "Dark/Light Mode",
        "Account Registring/Loging",
        "Graphical UI Overall",
        "Loading Elements",
        "Mobile Friendly Interface",
        "+ MORE..."
      ],
      bugs: [
        "Refreshing Issues",
        "Validations",
        "Performance issues",
         "+ MORE..."
      ],
    },
    // version2: {
    //   title: "2.0",
    // },
  };
  return (
    <div className="flex flex-row">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full">
            <TbNotes size={35} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <h2>Release Notes</h2>
          {Object.values(notes).map((x: any) => (
            <Dialog key={x.title}>
              <DialogTrigger asChild>
                <Button>
                  {x.title}
                  <TbNotes />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <NoteModal notes={x} />
              </DialogContent>
            </Dialog>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReleaseNotes;
