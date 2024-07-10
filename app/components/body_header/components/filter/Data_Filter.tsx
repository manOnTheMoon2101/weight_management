"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";


export function Data_Filter(month:any) {
  const [customVariable, setCustomVariable] = useState(month);
 

  return (
    <div>
      <Button>This Month</Button>
    </div>
  );
}
