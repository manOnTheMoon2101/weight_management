"use client";
import React from "react";
import { TbNotes } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NoteModal from "./components/NoteModal";
const ReleaseNotes = () => {
  const notes: any = {
    version0: {
      title: "0.5",
      date:'July 2024',
      features: "",
      bugs: [
        "Refreshing Issues",
        "Theme Provider",
        "UI overlaping",
        "Loading elements",
        "Responsive Design(Mobile View)",
        "Form Fixes",
        "Validations",
        "Performance issues",
        "+ more...",
      ],
    },
    version1: {
      title: "1.0",
      date:'August 2024',
      features: [
        "Graphical UI Overall",
        "Theme Modes",
        "Mobile Friendly Interface",
        "Graphs",
        "Refresh Functions",
        "+ more...",
      ],
    },
  };
  return (
    <div className="flex flex-row">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full animate-ping-long">
            <TbNotes size={35} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <h2>Release Notes</h2>
          {Object.values(notes).map((x: any) => (
            <Dialog key={x.title}>
              <DialogTrigger asChild>
                {x.title == "1.0" ? <Button className="bg-orange-400">
                  {x.title}
                  <TbNotes />
                </Button> : <Button>
                  {x.title}
                  <TbNotes />
                </Button>}
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
