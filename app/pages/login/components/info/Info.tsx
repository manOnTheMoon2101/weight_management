"use client";
import * as React from "react";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { FaInfoCircle } from "react-icons/fa";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
export function Info() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-help" variant="ghost">
            <FaInfoCircle size={30} className="text-owhite" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div>
            <h2 className="text-center text-2xl">
              Welcome to my Weight Management App!
            </h2>
            <p className="m-5 text-center ">
              This platform is designed specifically for showcasing some of my
              skills and is used by a select group of users.
              <br />
            </p>
            <p className="m-5 text-center">
              If you encounter any bugs or issues while using the site,I
              encourage you to report them so I can address them promptly.
              <br />
              Your feedback is invaluable in helping me improve the experience.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="cursor-help" variant="ghost">
          <FaInfoCircle size={30} className="text-owhite" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div>
          <h2 className="text-center text-2xl">
            Welcome to my Weight Management App!
          </h2>
          <p className="m-5 text-center ">
            This platform is designed specifically for showcasing individual
            work and is used by a select group of users.
            <br />
            <br />
            To ensure the security of your information, please avoid using
            real-life Google passwords or any other sensitive credentials when
            registering or logging in.
            <br />
            <br />
          </p>
          <p className="m-5 text-center">
            If you encounter any bugs or issues while using the site,I encourage
            you to report them so we can address them promptly.
            <br />
            Your feedback is invaluable in helping me improve the experience for
            everyone.
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
