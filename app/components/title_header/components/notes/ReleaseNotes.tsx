import React from "react";
import { TbNotes } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NoteModal from "./components/NoteModal";
const ReleaseNotes = () => {
  const notes: any = {
    version1: {
      title: "1.0",
      details: "finally out of beta!!!enjoy new features and we're actively on the lookout for them pesty bugs.",
      features: [
        "Dark/Light Mode",
        "Register New User Page",
        "Graphical UI Overall",
      ],
      bugs: [
        "Loading elements fixed",
        "Form validations to Forms",
        "Mobile Design UI Fixed",
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
