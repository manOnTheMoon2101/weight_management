import React from "react";
import { Tienne } from "next/font/google";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
export const tienne = Tienne({
  subsets: ["latin"],
  weight: ["400", "700"],
});
function Hero() {
  return (
    <div className="w-full md:w-1/2 text-center p-8">
      <span className={`${tienne.className} text-6xl font-bold`}>Welcome!</span> <br />
      <span className="text-2xl italic">
        Let’s turn those extra cookies into <span className="text-primary">sweat</span> and sass.🍪🔥😎<br/>
        <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 font-bold h-8">
              <Link href="/demo">See How John's Progressing...</Link>
            </Badge>
      </span>
    </div>
  );
}
export default Hero;
