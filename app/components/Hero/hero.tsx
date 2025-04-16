import React from "react";
import { Tienne } from "next/font/google";

export const tienne = Tienne({
  subsets: ["latin"],
  weight: ["400", "700"],
});
function Hero() {
  return (
    <div className="w-full md:w-1/2 text-center p-8">
      <span className={`${tienne.className} text-6xl font-bold`}>Welcome!</span> <br />
      <span className="text-2xl italic">
        Let’s turn those extra cookies into <span className="text-primary">sweat</span> and sass.🍪🔥😎
      </span>
    </div>
  );
}
export default Hero;
